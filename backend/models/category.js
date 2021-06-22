const mongoose=require('mongoose');
var newschema={
    categoryName:{
        type:String,
        trim:true,
        required:true
    }
}
module.exports=Category=mongoose.model('categories',newschema)