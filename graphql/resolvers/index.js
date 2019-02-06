const bcrypt = require('bcrypt');
const Product = require('../../models/product');
const Customer = require('../../models/customer');
const Order = require('../../models/order');


const customer = async custId => {
    try{
    const customer = await  Customer.findById(custId)
      return {...customer._doc,
        password:null, 
        createdOrders: orders.bind(this, customer._doc.createdOrders)};
        } catch(err){
            throw err;
        }
    };
        

const orders = async orderIds => {
        try{
    const orders = await Order.find({_id: {$in: orderIds}})
    orders.map(order =>{
        return {...order._doc, 
            orderCreator: customer.bind(this, order.orderCreator) };
    });
    return orders;
   } catch (err) {
    throw err;
   }
};


module.exports = {

    products: async () => {
        try{
      const products = await Product.find()
            return products.map(product =>{
                return { ...product._doc };
            });
        } catch(err){
            throw err;
        }
     },

    customers: async () => {
        try{
      const customers = await Customer.find()
        
            return customers.map(customer =>{
                return { ...customer._doc, 
                    password:null };
            });
        
        }catch(err){
            throw err;
        }
    },
    orders: async () => {
        try{
      const orders = await Order.find()
         
            return orders.map(order =>{
                console.log(order);
                return { 
                    ...order._doc,
                    password:null,
                    orderCreator : customer.bind(this, order._doc.orderCreator)
                };
            });
         
         } catch(err){
            throw err;
        };
    },
    createOrder: async (args) => {
        const order = await new Order({
            type: args.orderInput.type,
            orderCreator : '5c5a9b147f77a732fcd06856'
        });
        let createdOrder; 
        try{
        const result = await order
            .save()
                createdOrder = {...result._doc,
                    orderCreator: customer.bind(this, result._doc.orderCreator)
                };
                const creator = await Customer.findById('5c5a9b147f77a732fcd06856')
                    if(!creator){
                    throw new Error("Customer Doesnt exist!");
                }
                creator.createdOrders.push(order);
                await creator.save();
                return createdOrder;
              }catch(err) {
                 throw(err);
                }
    },

    createProduct: async (args) => {
        try{
        await Product.findById(args.productInput._id)
        const product = new Product({
            name: args.productInput.name,
            description: args.productInput.description,
            type: args.productInput.type,
            price: args.productInput.price,
            isVeg: args.productInput.isVeg
        });
        const result = await product
            .save()
               console.log(result);
                return { ...result._doc};
               }catch(err){
                console.log(err);
            }
         
    },
    createCustomer: async args => {
        try{
        const exisitngCustomer = await Customer.findOne({email: args.custInput.email})
            if(exisitngCustomer){
                throw new Error("User Email Exists ! Please Login !");
            }
        const hashedPassword =  await bcrypt.hash(args.custInput.password, 12)
            const customer = new Customer({
                name:args.custInput.name,
                email:args.custInput.email,
                password:hashedPassword,
                phoneNum:args.custInput.phoneNum
            });
            const result = await customer.save();
              return {...result._doc, password: null };
     
            }catch(err){
            throw err;
        }
    },
     }