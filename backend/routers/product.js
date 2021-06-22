const express=require('express');
const router=express.Router();
const Product=require('./../models/product');
const upload=require('./../config/multer');
router.post('/saveProduct',upload.single(""),(req,res)=>{
    var addProduct={}
    if (req.file !== undefined) {
        addProduct={
            name:req.body.name,
            categoryId:req.body.categoryId,
         
    }
    }else{
        addProduct={   
        name:req.body.name,
        categoryId:req.body.categoryId,

        }
    }
    console.log(2);
    console.log(addProduct);

new Product(addProduct).save()
    .then(()=>{
        res.status("200").json({msg:"product Inserted Successfully!"});
    }).catch((err)=>{
        console.log(err);
    })
})

router.get('/viewProduct', function (req, res) {
    Product.find({})
    .populate("categoryId")
    .then((response)=>{
        res.status("200").json(response)   
    }).catch((err)=>{
        console.log(err);
    })
})

//router.get('/viewProduct', function(req, res, next) {
//     var perPage = 9
//     var page = req.params.page || 1

//     Product
//         .find({})
//         .skip((perPage * page) - perPage)
//         .limit(perPage)
//         .exec(function(err, products) {
//             Product.count().exec(function(err, count) {
//                 if (err) return next(err)
//                 res.render('/viewProduct', {
//                     products: products,
//                     current: page,
//                     pages: Math.ceil(count / perPage)
//                 })
//             })
//         })
// })

router.get('/deleteProduct/:id',(req,res)=>{
    Product.deleteOne({_id:req.params.id})
    .then((response)=>{
        res.status("200").json({msg:"Data Deleted Successfully!"})
    })
    .catch((err)=>{
        console.log(err);
    })
})

router.get('/editProduct/:id',(req,res)=>{
    Product.findOne({_id:req.params.id})
    .then((response)=>{
        res.status("200").json(response) 
    })
    .catch(err=>{
        console.log(err);
    })
})

router.post('/updateProduct',(req,res)=>{
    Product.findOne({_id:req.body.id})
    .then((data)=>{
        data.name=req.body.name;
        // data.price=req.body.price;
        // data.quantity=req.body.quantity;
        // data.description=req.body.description;
        data.save()
        .then((result)=>{
            res.status("200").json(result);
        }).catch((err)=>{
            console.log(err);
        })

    })
    .catch((err)=>{
        console.log(err);
    })
})
module.exports=router;