const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema.js');
const {customers} = require('./customers.json');
const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
  }),
);

//all customers
app.get("/api/customers", (req, res) => {
    res.json(customers);
});

//customer
app.get('/api/customers/:id', (req, res) => {
    res.json(customers.find(c => c.id === req.params.id));
});

app.listen(5000, function() {
    console.log("server is running on the port 5000");
})

