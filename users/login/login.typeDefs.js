
const { gql } = require("apollo-server-express");

const loginQueries = gql`

  type LoginResult {
    ok: Boolean!
    token: String
    error: String
  }

  type Mutation {
    login(username: String!, password: String!): LoginResult!

  }

`
module.exports = loginQueries
