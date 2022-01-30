const { gql } = require("apollo-server-express")

const searchPhotosQuery = gql`

  type Query {
    searchPhotos(keyword: String!): [Photo] #keyword is hashtag, what we search by
  }
`

module.exports = searchPhotosQuery