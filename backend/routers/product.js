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

// router.get('/viewProduct', function (req, res) {
//     Product.find({})
//     .populate("categoryId").skip(1).limit(9)
//     .then((response)=>{
//         res.status("200").json(response)   
//     }).catch((err)=>{
//         console.log(err);
//     })
// })
router.get('/viewProduct', function (req, res) {
        var pageNo = parseInt(req.query.pageNo)
        var size = parseInt(req.query.size)
        var query = {}
        if(pageNo < 0 || pageNo === 0) {
              response = {"error" : true,"message" : "invalid page number, should start with 1"};
              return res.json(response)
        }
        query.skip = size * (pageNo - 1)
        query.limit = size
        // // Find some documents
        Product.find({},{},query)
            .populate("categoryId")
            .then((response)=>{
                res.status("200").json(response)   
            }).catch((err)=>{
                console.log(err);
            })
              });
   
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