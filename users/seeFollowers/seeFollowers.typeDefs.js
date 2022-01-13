const { gql } = require("apollo-server-express")

const seeFollowersQuery = gql`
  type SeeFollowersResult {
    ok: Boolean!
    error: String
    followers: [User]
    following: [User]
    totalPages: Int
  }

  type Query {
    seeFollowers(username: String!, page: Int): SeeFollowersResult!
  }
`
module.exports = seeFollowersQuery