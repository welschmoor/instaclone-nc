const { gql } = require('apollo-server-express')


const roomUpdates = gql`
  type Subscription {
    roomUpdates(id: Int!): Message #id is room id
  }
`

module.exports = roomUpdates