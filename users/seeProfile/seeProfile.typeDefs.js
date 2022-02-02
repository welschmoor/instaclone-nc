
const { gql } = require("apollo-server-express");

const seeProfileQueries = gql`
  type Query {
    seeProfile(username: String!, take: Int): User
  }
`
module.exports = seeProfileQueries
