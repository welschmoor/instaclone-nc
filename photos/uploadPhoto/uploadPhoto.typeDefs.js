const { gql } = require("apollo-server-express")

const uploadPhotoQuery = gql`
  type UploadFileResult {
    ok: Boolean!
    error: String
    photoUrl: String
  }

  type Mutation {
    uploadPhoto(file: Upload!, caption: String): UploadFileResult!
  }
`

module.exports = uploadPhotoQuery