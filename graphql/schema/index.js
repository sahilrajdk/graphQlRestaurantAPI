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
            createdAt: String!
            updatedAt: String!
            items:[Product!]!
            customer: Customer!
             
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

        type AuthData{
            userId: ID!
            token: String!
            tokenExpiration: Int!
        }

        type RootQuery {
            products: [Product!]!
            orders: [Order!]
            customers:[Customer!]
            login(email: String!, password: String!): AuthData!
        }

        type RootMutation {
            createProduct(productInput: ProductInput): Product
            createOrder(orderInput: OrderInput): Order
            cancelOrder(orderId: ID!): Customer
            createCustomer(custInput: CustInput): Customer
        }

        schema {
            query:RootQuery
            mutation:RootMutation
        }
    `)