const mongoose=require('mongoose');
var newschema={
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    gender:{
        type:String,
        trim:true,
        required:true
    },
}
module.exports=Users=mongoose.model('users',newschema)