const { gql } = require("apollo-server-express")

const searchPhotosQuery = gql`
  type Dummy {
    ok: Boolean!
  }

  type Query {
    searchPhotos(keyword: String!): [Photo] #keyword is hashtag, what we search by
  }
`

module.exports = searchPhotosQuery