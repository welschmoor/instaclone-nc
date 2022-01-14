const { gql } = require("apollo-server-express")

const uploadPhotoQuery = gql`
  type UploadFileResult {
    ok: Boolean!
    error: String
    photo: Photo
  }

  type Mutation {
    uploadPhoto(file: String!, caption: String): UploadFileResult!
  }
`

module.exports = uploadPhotoQuery