const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema.js');
const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
  }),
);

app.listen(5000, function() {
    console.log("server is running on the port 5000");
})

