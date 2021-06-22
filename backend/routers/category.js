const express=require('express');
const router=express.Router();
const Category=require('./../models/category');
router.post('/saveCategory',(req,res)=>{
    let addCategory={
        categoryName:req.body.categoryName   
}
new Category(addCategory).save()
    .then(()=>{
        res.status("200").json({msg:"category Inserted Successfully!"});
    }).catch((err)=>{
        console.log(err);
    })
})


router.get('/viewCategory', function (req, res) {
    Category.find({}).limit(1)
    .then((response)=>{
        res.status("200").json(response)   
    }).catch((err)=>{
        console.log(err);
    })
})

router.get('/deleteCategory/:id',(req,res)=>{
    Category.deleteOne({_id:req.params.id})
    .then((response)=>{
        res.status("200").json({msg:"Data Delated Successfully!"})
    })
    .catch((err)=>{
        console.log(err);
    })
})

router.get('/editCategory/:id',(req,res)=>{
    Category.findOne({_id:req.params.id})
    .then((response)=>{
        res.status("200").json(response) 
    })
    .catch(err=>{
        console.log(err);
    })
})

router.post('/updateCategory',(req,res)=>{
    Category.findOne({_id:req.body.id})
    .then((data)=>{
        data.categoryName=req.body.categoryName;
        data.save()
        .then((result)=>{
            res.status("200").json({msg:"Data Updated Successfully!"});
        }).catch((err)=>{
            console.log(err);
        })

    })
    .catch((err)=>{
        console.log(err);
    })
})
module.exports=router;