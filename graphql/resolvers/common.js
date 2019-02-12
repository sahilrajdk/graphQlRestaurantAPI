const Order = require('../../models/order');
const Customer = require('../../models/customer');


const customer = async custId => {
    try{
    const customer = await  Customer.findById(custId)
      
      return {...customer._doc,
        password:null, 
        createdOrders: orders.bind(this, customer.createdOrders)};
        } catch(err){
            throw err;
        }
    };
const orders = async orderIds => {
    try{
        const orders = await Order.find({ _id : {$in: orderIds}  })
        
        return orders.map(order =>{
            return {...order._doc,
                customer: customer.bind(this,order.customer)   
            };
            });
        }catch(err){
            throw err;
        }
        };






exports.customer = customer;
exports.orders = orders;