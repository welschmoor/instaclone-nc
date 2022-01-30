const { gql } = require("apollo-server-express")

const showAllUsersQuery = gql`
  type Query {
    showAllUsers: [User] 
  }
`

module.exports = showAllUsersQuery