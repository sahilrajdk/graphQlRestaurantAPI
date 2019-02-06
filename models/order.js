const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({

    type:{
        type:String,
        required:true
    },
    
    customer:{
        type:Schema.Types.ObjectId,
        ref:'Customer'
    },
    items:[{
        type:Schema.Types.ObjectId,
        ref:'Product'
    }],
  
},{timestamps:true}

)

module.exports = mongoose.model('Order',orderSchema);