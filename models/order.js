const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({

    type:{
        type:String,
        required:true
    },
 
    orderCreator:{
        type:Schema.Types.ObjectId,
        ref:'Customer'
    }
})

module.exports = mongoose.model('Order',orderSchema);