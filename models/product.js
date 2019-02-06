const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
    name:{ 
        type:String,
        required: true
    } ,
    description:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required:true
    },
    isVeg:{
        type: Boolean,
        required:true
    }

});

module.exports = mongoose.model('Product',productSchema);