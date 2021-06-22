const express=require('express');
const router=express.Router();
const User=require('./../models/registration');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const privateKey=require('./../config/keys').privateKey;
router.post('/register',(req,res)=>{
    let user={
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    gender:req.body.gender,
}
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
        user.password=hash;
        new Users(user).save()
        .then(()=>{
            res.status(200).json({msg:"Data Inserted Successfully!"});
        }).catch((err)=>{
            console.log(err);
        })
    })
})
})

router.post('/login',(req,res)=>{
    User.findOne({email:req.body.email})
    .then((response)=>{
        if(!response){
            res.status(400).json({msg:"User with this email ID does not exist!"}) 
        }else{
        bcrypt.compare(req.body.password,response.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                //res.status(200).json({msg:"you are loged in Successfully!"})
                const payload={
                    name:response.name,
                    email:response.email,
                    id:response._id,
                }

                jwt.sign(payload,privateKey,(err,token)=>{
                    //console.log(token);
                    res.json({
                        success:true,
                        token:"Bearer "+token,
                    })
                })
            }else{
                res.status(400).json({msg:"Password Incoreect!"})   
            }
        })
    }
    })
    .catch((err)=>{
        console.log(err);
    })
})
module.exports=router;