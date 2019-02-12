const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/isAuth');

const app = express();

mongoose.connect(
    `mongodb://${process.env.MONGO_USER}:${process.env.MONGODB_PASSWORD}@cluster0-shard-00-00-fk7ab.mongodb.net:27017,cluster0-shard-00-01-fk7ab.mongodb.net:27017,cluster0-shard-00-02-fk7ab.mongodb.net:27017/myrestaurant?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`
, {useNewUrlParser:true}).then(
    app.listen(8000)).catch(err => { console.log(err)});

app.use(bodyParser.json());

app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    if(req.method === 'OPTIONS'){
       return res.sendStatus(200);
    }
    next();
});

app.use(isAuth);

app.use('/graphql', graphqlHttp({
    schema:graphQlSchema ,
    rootValue: graphQlResolvers,
    graphiql:true
}));

