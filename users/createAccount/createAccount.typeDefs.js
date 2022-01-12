
const { gql } = require("apollo-server-express");


const createAccountQueries = gql`

  type CreateAccountResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    createAccount(    
      firstName: String!
      lastName:  String
      username:  String!  
      email:     String!
      password:  String!
    ): CreateAccountResult!

    login(username: String!, password: String!): LoginResult!

  }

`
module.exports = createAccountQueries
