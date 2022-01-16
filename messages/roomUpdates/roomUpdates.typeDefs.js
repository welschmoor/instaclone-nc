const { gql } = require('apollo-server-express')


const roomUpdates = gql`
  type Subscription {
    roomUpdates: Message #id is room id
  }
`

module.exports = roomUpdates