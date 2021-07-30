require('dotenv').config({ path: './config/.env' })

const express=require("express")
const mongoose=require("mongoose")
const User=require("./models/User")
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
 mongoose.connect(`mongodb://localhost/${process.env.DATABASENAME}`,{ useNewUrlParser: true },(err)=>{
if (err) {throw err} 
else console.log("connect to data base")
})
// app.get("/",(req,res)=>{
//       User.find({ username: req.body.username })
// .then(result=> {if (result) {res.status(200).json({user:result})}
// else 
// res.status(404).json({err:error})})
// .cath((err)=>res.status(404).json({error:err}))
//  })
app.get("/",(req,res)=>{
    User.find({},"lastname firstname age",(err,doc)=>{ 
  if (err)  
  {res.status(404).json({error:err})} 
  res.status(200).json({user:doc})
    })
})
 app.post("/add",(req,res)=>{
     const modeluser=new User({
        lastname:req.body.lastname,
        firstname:req.body.firstname,
                age:req.body.age

     })
     modeluser.save((error,doc)=>{
         if (error)
          res.status(404).json({err:error})
          else    res.status(200).json({msg:"user is added"})
     })
 })
 app.patch("/update/:id",(req,res)=>{
     const userupdate= {lastname:req.body.lastname,firstname:req.body.firstname,age:req.body.age}
    User.findOneAndUpdate({_id:req.params.id},{$set:userupdate},(err,result)=>{
        
            if (err)
             res.status(404).json({error:"user not found"})
             else    res.status(200).json({msg:"user is update"})
        
    })
 })
 app.delete("/delete/:id",(req,res)=>{
   User.findOneAndDelete({_id:req.params.id},(err,result)=>{
       
           if (err)
            res.status(404).json({error:"user not found"})
            else    res.status(200).json({msg:"user is deletet"})
   })
})
app.listen(process.env.PORT,()=>console.log("running server "))
