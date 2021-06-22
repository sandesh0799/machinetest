const mongoose=require('mongoose');
const Schema=mongoose.Schema
var newschema=new Schema({
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:"categories",
    },
    name:{
        type:String,
        trim:true,
        required:true
    },
    
})
module.exports=Product=mongoose.model('produts',newschema)