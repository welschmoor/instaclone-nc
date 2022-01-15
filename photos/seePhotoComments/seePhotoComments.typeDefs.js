const { gql } = require("apollo-server-express")

const seePhotoCommentsQuery = gql`
  type Query {
    seePhotoComments(id: Int!): [Comment]
  }
`

module.exports = seePhotoCommentsQuery