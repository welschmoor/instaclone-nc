const { gql } = require("apollo-server-express")

const seePhotoLikesQuery = gql`
  type Query {
    seePhotoLikes(id: Int!): [User] #we show users who liked the pics
  }
`

module.exports = seePhotoLikesQuery