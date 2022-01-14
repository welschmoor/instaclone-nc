const { gql } = require("apollo-server-express")

const seePhotoQuery = gql`
  type Query {
    seePhoto(id: Int!): Photo
  }
`

module.exports = seePhotoQuery