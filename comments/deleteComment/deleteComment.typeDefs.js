const { gql } = require("apollo-server-express")

const deleteCommentQuery = gql`
  type deleteCommentResult {
    ok: Boolean!
    error: String
    id: Int
  }

  type Mutation {
    deleteComment(id: Int!): deleteCommentResult!
  }
`

module.exports = deleteCommentQuery