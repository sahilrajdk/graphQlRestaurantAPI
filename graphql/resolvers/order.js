const { customer, orders} = require('./common');
const Product = require('../../models/product');
const mongoose = require('mongoose');
const Order = require('../../models/order');
const Customer = require('../../models/customer');

module.exports = {

     
    orders: async () => {
        try{
      const orders = await Order.find()
            return orders.map(order =>{
                 
                return { 
                    ...order._doc,
                    createdAt: new Date(order._doc.createdAt).toDateString(),
                    updatedAt: new Date(order._doc.updatedAt).toDateString(),
                    customer: customer.bind(this, order._doc.customer)
                 };
            });
         
         } catch(err){
            throw err;
        };
    },

    createOrder: async (args,req) => {
        if(!req.isAuth){
            throw new Error("NOt authenticted");
        }
        const items = await Product.find({'_id':{$in: [
            mongoose.Types.ObjectId('5c59643c4b63df1bbc541815'),
            mongoose.Types.ObjectId('5c5966b4bf83c535c0a2b1a7'),
            mongoose.Types.ObjectId('5c5ace376d2ded2658f9fccc')
        ]}}, function(err,docs){
           
        });

        const order = await new Order({
            type: args.orderInput.type,
            customer : req.userId,
            items:items
      });
        let createdOrder; 
        try{
        const result = await order
            .save()
             createdOrder= {
                 ...result._doc,
                 _id:result._doc._id.toString(),
                createdAt: new Date(result._doc.createdAt).toString(),
                updatedAt: new Date(result._doc.updatedAt).toString(),
                customer: customer.bind(this, result._doc.customer)
            };
            const newcustomer = await Customer.findById(req.userId);
            if(!newcustomer){
                throw new Error('Customer not found');
            }
            newcustomer.createdOrders.push(order);
            await newcustomer.save();
            return createdOrder;
            }catch(err) {
                 throw(err);
                }
    },
    cancelOrder: async (args,req) => {
        if(!req.isAuth){
            throw new Error("NOt authenticted");
        }
        try{
            const order = await Order.findById(args.orderId).populate('customer');
            if(!order){
                throw new Error("Order doesnot exist");
            }
            const customer = { ...order.customer._doc}
            await Order.deleteOne({_id: args.orderId});
           return customer;
        }catch(err){
            throw err;
        }


    },

    
     }