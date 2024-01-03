const express = require('express');
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose');
const Shoes = require('./model/shoes')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const myOrder = require('./model/my_order');
const shoes = require('./model/shoes');
const categoryRouter = require('./routes/categoryRoute')

const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use('/category', categoryRouter)
app.set('view engine', 'ejs')
require('dotenv').config();

mongoose.connect("mongodb+srv://romnick:1234@romnickdb.e14diyv.mongodb.net/shoesdb",{
    useNewUrlParser: true, useUnifiedTopology:true
}).then(()=>{
    console.log('connected success')
});

const Storage = multer.diskStorage({
    destination:"uploads",
    filename: (req,file,cb)=>{
        cb(null, file.originalname)
    },
});

const upload = multer({
    storage:Storage
}).single('image')

app.get('/add-product',  (req,res)=>{
    res.render('addShoes')
});

app.post('/', (req,res) => {
    upload(req,res, (err) =>{
        if(err){
            console.log(err)
        }else {
            const newShoes = new Shoes({
                title:req.body.title, 
                image:{
                    data: fs.readFileSync(path.join(__dirname + '/uploads/' +req.file.filename)),
                    contentType:'image/jpg'
                },
                category:req.body.category,
                price:req.body.price
            })
            newShoes.save();
        }
        
    })
         res.redirect('/product-list');
});





app.get('/product-list', async (req,res)=>{
    const imagePath = 'images/banner1.jpg';
    const list = await Shoes.find({});
    res.render('display', {list, imagePath})
});

app.get('/', (req, res) => {
    const imagePath = './images/banner1.jpg'; // Update this path with the actual path to your image
    res.render('category', { imagePath });
  });

app.get('/categories',async(req,res)=>{
    const category = req.query.category;

    const list = await Shoes.find({category})
    res.render('display', {list})

});

app.post('/product-list', async (req, res) => {
    const searchTerm = req.body.search;
    // Search products in MongoDB based on the search term
    const list = await Shoes.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } }
      ],
    });
    res.render('display', { list, searchTerm });
  });

app.get('/myorder', async(req,res)=>{
    
    const product = await Shoes.find({});

    res.render('myorder',{product})
});

app.get('/demo',(req,res) =>{
    res.render('demo')
})

app.listen(port, () =>{
    console.log(`server is running at http://localhost:${port}/product-list`)
})

