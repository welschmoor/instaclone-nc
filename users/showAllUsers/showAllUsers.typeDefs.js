const { gql } = require("apollo-server-express")

const showAllUsersQuery = gql`
  type Query {
    showAllUsers(limit: Int): [User] 
  }
`

module.exports = showAllUsersQuery