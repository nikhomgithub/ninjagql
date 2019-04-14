const express = require('express');
const app = express();
const graphqlHTTP=require('express-graphql');
const mongoose = require('mongoose');
const schema=require('./schema/schema');
const cors = require('cors');

app.use(express.json());
// allow cross-origin requests
app.use(cors());

const db="mongodb+srv://nikhom123:meemee@cluster0-7ll9a.gcp.mongodb.net/test?retryWrites=true";
mongoose
  .connect(db,{
    useNewUrlParser:true,
    useCreateIndex:true
  })
  .then(()=>console.log('MongoDB conncected'))
  .catch(err=>console.log(err));

app.use('/graphql',graphqlHTTP({
  schema,
  graphiql:true
}));

const port=process.env.PORT||5000;

app.listen(port,()=>{
  console.log(`Listen on port ${port}`)
});