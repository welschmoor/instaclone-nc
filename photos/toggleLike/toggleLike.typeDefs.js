const { gql } = require("apollo-server-express")

const likePhotoQuery = gql`
  type ToggleLikeResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    toggleLike(id: Int!): ToggleLikeResult! #id is photo id
  }
`

module.exports = likePhotoQuery