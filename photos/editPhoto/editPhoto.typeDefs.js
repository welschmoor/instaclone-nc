const { gql } = require("apollo-server-express")

const editPhotoQuery = gql`
  type EditPhotoResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    editPhoto(id: Int!, caption: String!): EditPhotoResult!
  }
`

module.exports = editPhotoQuery