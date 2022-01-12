
const { gql } = require("apollo-server")

const seeProfileQueries = gql`
  type Query {
    seeProfile(username: String!): User
  }
`
module.exports = seeProfileQueries
