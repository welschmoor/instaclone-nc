const { gql } = require("apollo-server-express")

const unfollowUserQuery = gql`
  type UnfollowUserResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    unfollowUser(username: String!): UnfollowUserResult!
  }
`

module.exports = unfollowUserQuery