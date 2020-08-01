const { graphql, GraphQLList } = require("graphql");
const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

// const customers = [
//   { id: '1', name: 'serge kenne', email: 'sergekenn@mail.ru', age: 38 },
//   { id: '2', name: 'savanna Will', email: 'willysavana@gmail.com', age: 48 },
//   { id: '3', name: 'Theosmith', email: 'theosmith@yahoo.fr', age: 25 },
//   { id: '4', name: 'skenne', email: 'skenn@mail.ru', age: 36 },
// ];

//CustomerType

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

// RootQuery

const RootQuery = new GraphQLObjectType({
    name: "RootQuerytype",
    fields: {
        customer: {
            type: CustomerType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parentValue, args) {
                //return customers.find(cust => cust.id === args.id);
                return axios
                  .get(`http://localhost:5000/api/customers/${args.id}`)
                  .then((res) => res.data);
                    
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args) {
                return axios.get('http://localhost:5000/api/customers')
                            .then(res => res.data);
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
})