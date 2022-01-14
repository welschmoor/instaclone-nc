const { gql } = require("apollo-server-express")

const seeHashtagQuery = gql`


  type Query {
    seeHashtag(hashtag: String!): Hashtag
  }
`

module.exports = seeHashtagQuery