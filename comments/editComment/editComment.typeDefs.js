const { gql } = require("apollo-server-express")

const editCommentQuery = gql`
  type EditCommentResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    editComment(id: Int!, payload: String!): EditCommentResult!
  }
`

module.exports = editCommentQuery