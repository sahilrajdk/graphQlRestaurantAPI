const { buildSchema } = require('graphql');

module.exports = buildSchema(`
        type Product {
            _id: ID!
            name: String!
            description: String!
            type: String!
            price: Float!
            isVeg: Boolean!
        }

        input ProductInput {
            name: String!
            description: String!
            price: Float!
            type: String!
            isVeg: Boolean!
        }

        type Order {
            _id: ID!
            type:String
            orderCreator: Customer!
         }

        input OrderInput {
            type:String!
        }

        type Customer {
            _id: ID!
            name:String
            email:String!
            password:String
            phoneNum:Int
            createdOrders: [Order!]
        }

        input CustInput {
            name:String
            email:String!
            password:String!
            phoneNum:Int
        }

        type RootQuery {
            products: [Product!]!
            orders: [Order!]
            customers:[Customer!]
        }

        type RootMutation {
            createProduct(productInput: ProductInput): Product
            createOrder(orderInput: OrderInput): Order
            createCustomer(custInput: CustInput): Customer
        }

        schema {
            query:RootQuery
            mutation:RootMutation
        }
    `)