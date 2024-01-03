const mongoose = require('mongoose');

const shoesSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        data:Buffer,
        contentType:String
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String
    }
});

module.exports = mongoose.model('shoe', shoesSchema)