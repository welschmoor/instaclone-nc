const { gql } = require("apollo-server-express")

const commentsTypeDefs = gql`
  type Comment {
    id:      Int!
    payload: String!
    user:    User!
    photo:   Photo!
    isMine:  Boolean!
    
    createdAt: String!
    updatedAt: String!
  }

  # type Query {
  #   seeComment(id: Int!): Comment
  # }
`

module.exports = commentsTypeDefs