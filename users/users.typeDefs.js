
const { gql } = require("apollo-server-express");

const userQueries = gql`

  scalar Upload
  
  type User {
    id:        Int!    
    fullName:  String!
    firstName: String
    lastName:  String
    username:  String!  
    email:     String!
    bio:       String
    avatar:    String
    following: [User]
    followers: [User]
    photos:    [Photo]
    totalFollowing: Int!
    totalFollowers: Int!
    totalPics: Int!
    isFollowing: Boolean! #shows if we follow that user
    isMe: Boolean! #shows if profile we are looking at is me

    createdAt: String!
    updatedAt: String!
  }

  type Query {
    seeProfile(username: String!): User
    allUsers: [User!]!
  }
`

module.exports = userQueries