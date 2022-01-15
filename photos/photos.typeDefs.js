const { gql } = require("apollo-server-express")


const photosTypeDefs = gql`
  type Photo {
    id: Int!
    name: String!
    user: User!
    file: String!
    caption: String
    hashtags: [Hashtag]
    likes: Int!
    isMine:  Boolean!
    
    createdAt: String!
    updatedAt: String!
  }

  type Hashtag {
    id: Int!
    hashtag: String!
    photos(page: Int!): [Photo]
    totalPhotos: Int!

    createdAt: String!
    updatedAt: String!
  }

  type Query {
    dummyR: String!
  }

  type Like { # this is unencessary, because we never look at likes as separate entities
    id: Int!
    photo: Photo!
    createdAt: String!
    updatedAt: String!
  }
`


module.exports = photosTypeDefs