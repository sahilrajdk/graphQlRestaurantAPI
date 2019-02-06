const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');


const app = express();

mongoose.connect(
    `mongodb://${process.env.MONGO_USER}:${process.env.MONGODB_PASSWORD}@cluster0-shard-00-00-fk7ab.mongodb.net:27017,cluster0-shard-00-01-fk7ab.mongodb.net:27017,cluster0-shard-00-02-fk7ab.mongodb.net:27017/myrestaurant?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`
, {useNewUrlParser:true}).then(
    app.listen(3000)).catch(err => { console.log(err)});




app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
    schema:graphQlSchema ,
    rootValue: graphQlResolvers,
    graphiql:true
}));

app.get('/', (req,res,next) => {
    res.send('My restaurant');
});

