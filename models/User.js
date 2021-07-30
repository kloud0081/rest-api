const mongoose=require("mongoose")
const Schema = mongoose.Schema;
const usershema=Schema({
    lastname: { type: String,required:true },
    firstname:{type:String,required:true},
    age:{type:Number,required:true},

})
module.exports=mongoose.model("user",usershema)