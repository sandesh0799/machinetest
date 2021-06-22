const multer=require("multer");
const DIR="./public";

const storage=multer.diskStorage({
    destination:(req, res, cb)=>{
        cb(null,DIR);
    },
    filename:(req,file,cb)=>{
        const filename=file.originalname.toLowerCase().split(" ").join("-");
        const date=Date.now();
        cb(null, date+"-"+filename);
    }
})


const upload=multer({
    storage:storage,
})


module.exports=upload;