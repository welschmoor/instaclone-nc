const { gql } = require("apollo-server-express")

const searchUsersQuery = gql`
  type Query {
    searchUsers(keyword: String!): [User] #keyword could be a username
  }
`

module.exports = searchUsersQuery