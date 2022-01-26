const { gql } = require("apollo-server-express")

const createCommentQuery = gql`
  type CreateCommentResult {
    ok: Boolean!
    error: String
    commentId: Int
  }

  type Mutation {
    createComment(photoId: Int!, payload: String!): CreateCommentResult!
  }
`

module.exports = createCommentQuery