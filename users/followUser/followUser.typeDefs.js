
const { gql } = require("apollo-server-express");

const followerUserQueries = gql`
  type FollowUserResult {
    ok: Boolean!
    error: String
    userFollowId: Int
  }

  type Mutation {
    followUser(username: String!): FollowUserResult! #provide username you want to follow
  }
`
module.exports = followerUserQueries