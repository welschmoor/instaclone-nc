const { gql } = require("apollo-server-express")

const unfollowUserQuery = gql`
  type UnfollowUserResult {
    ok: Boolean!
    error: String
    userFollowId: Int
  }

  type Mutation {
    unfollowUser(username: String!): UnfollowUserResult!
  }
`

module.exports = unfollowUserQuery