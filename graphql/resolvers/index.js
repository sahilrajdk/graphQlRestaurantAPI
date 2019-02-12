 

const authResolver = require('./auth');
const ordersResolver = require('./order');
const productsResolver = require('./products');


const rootResolver = {
    ...authResolver,
    ...ordersResolver,
    ...productsResolver
};


module.exports = rootResolver;