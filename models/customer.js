const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name: {
        type: String,
        required:false
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    phoneNum:{
        type: Number,
        required:false
    },
    createdOrders:[{
        type:Schema.Types.ObjectId,
        ref:'Order'
    }]
       
});

module.exports = mongoose.model('Customer',customerSchema);