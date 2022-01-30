const { gql } = require("apollo-server-express")

const searchPhotosByHashtagQuery = gql`

  type Query {
    searchPhotosByHashtag(hashtag: String!): [Photo] 
  }
`

module.exports = searchPhotosByHashtagQuery