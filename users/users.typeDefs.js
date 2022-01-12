
const { gql } = require("apollo-server")

const userQueries = gql`
  type User {
    id:        Int!    
    firstName: String!
    lastName:  String
    username:  String!  
    email:     String!
    bio:       String
    avatar:    String

    createdAt: String!
    updatedAt: String!
  }

  type Query {
    seeProfile(username: String!): User
    allUsers: [User!]!
  }
`

module.exports = userQueries