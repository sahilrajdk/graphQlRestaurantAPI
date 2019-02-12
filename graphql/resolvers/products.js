
const Product = require('../../models/product');


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
               return { ...result._doc};
               }catch(err){
                console.log(err);
            }
         
    }
    
     }