const { gql } = require("apollo-server-express")

const seeFeedQuery = gql`
  type Query {
    seeFeed(cursor: Int): [Photo]
  }
`

module.exports = seeFeedQuery