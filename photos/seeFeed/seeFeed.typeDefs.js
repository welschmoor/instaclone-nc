const { gql } = require("apollo-server-express")

const seeFeedQuery = gql`
  type Query {
    seeFeed: [Photo]
  }
`

module.exports = seeFeedQuery