
const { gql } = require("apollo-server-express");

const seeProfileQueries = gql`
  type Query {
    seeProfile(username: String!): User
  }
`
module.exports = seeProfileQueries
