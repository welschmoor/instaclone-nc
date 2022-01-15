const { gql } = require("apollo-server-express")

const deletePhotoQuery = gql`
  type DeletePhotoResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    deletePhoto(id: Int!): DeletePhotoResult!
  }
`

module.exports = deletePhotoQuery