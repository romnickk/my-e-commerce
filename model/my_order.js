const mongoose = require('mongoose');
const myOrderSchema = new mongoose.Schema({
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
    }
});
module.exports = mongoose.model('myorder' , myOrderSchema);