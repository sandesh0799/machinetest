const express=require('express');
const app=express();
var cors=require('cors');
app.use(cors());
let mongoose=require('mongoose');

let mongoDbUri=require('./config/keys').mongoDbUri;
    mongoose.connect(mongoDbUri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log("Connected!");
}).catch((err)=>{
    console.log(err);
})

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port=5000;
app.listen(port,()=>{
    console.log(port);
})

const auth=require('./routers/auth');
const category=require('./routers/category');
const product=require('./routers/product');
app.use('/',auth,category,product);

app.use(express.static(__dirname+"/public"));