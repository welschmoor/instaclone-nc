const { gql } = require("apollo-server-express")

const seeFollowingQuery = gql`
  type SeeFollowingResult {
    ok: Boolean!
    error: String
    following: [User]
    followers: [User]
    totalPages: Int
  }

  type Query {
    seeFollowing(username: String! cursor: Int): SeeFollowingResult!
  }
`

module.exports = seeFollowingQuery