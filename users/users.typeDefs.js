
const { gql } = require("apollo-server-express");

const userQueries = gql`

  scalar Upload
  
  type User {
    id:        Int!    
    firstName: String!
    lastName:  String
    username:  String!  
    email:     String!
    bio:       String
    avatar:    String
    following: [User!]!
    followers: [User!]!

    createdAt: String!
    updatedAt: String!
  }

  type Query {
    seeProfile(username: String!): User
    allUsers: [User!]!
  }
`

module.exports = userQueries