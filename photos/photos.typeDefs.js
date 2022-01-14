const { gql } = require("apollo-server-express")


const photosTypeDefs = gql`
  type Photo {
    id: Int!
    name: String!
    user: User!
    file: String!
    caption: String
    hashtags: [Hashtag]

    createdAt: String
    updatedAt: String
  }

  type Hashtag {
    id: Int!
    hashtag: String!
    photos(page: Int!): [Photo]
    totalPhotos: Int!

    createdAt: String
    updatedAt: String
  }

  type Query {
    dummyR: String!
  }
`


module.exports = photosTypeDefs