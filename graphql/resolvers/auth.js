const bcrypt = require('bcrypt');
const Product = require('../../models/product');
const Customer = require('../../models/customer');
const jwt = require('jsonwebtoken');

module.exports = {
     
    customers: async () => {
        try{
      const customers = await Customer.find()
        
            return customers.map(customer =>{
                return { ...customer._doc, 
                    password:null ,
                   
                };
            });
        
        }catch(err){
            throw err;
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

    login: async ({email,password}) => {
        const user = await Customer.findOne({email:email});
        if (!user){
            throw new Error("User email does not exist");
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if(!isEqual){
            throw new Error("Invalid password");
        }
        const token = jwt.sign({userId : user.id, email: user.email}, 'supersecretkey',{ expiresIn: '1h'});
        return {
            userId:user.id,
            token: token,
            tokenExpiration: 1
        }


    }
 };