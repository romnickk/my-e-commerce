const express = require('express');
const Shoes = require('../model/shoes')
const router = express.Router();

router.get('/shoes', async(req,res)=>{
    const shoes = await Shoes.
    res.render('display', shoes)
})

module.exports = router