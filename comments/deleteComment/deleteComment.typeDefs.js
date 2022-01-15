const { gql } = require("apollo-server-express")

const deleteCommentQuery = gql`
  type deleteCommentResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    deleteComment(id: Int!): deleteCommentResult!
  }
`

module.exports = deleteCommentQuery