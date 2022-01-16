const { gql } = require("apollo-server-express")


const messagesTypeDefs = gql`
  type Message {
    id: Int!
    payload: String!
    room: Room!
    user: User!
    read: Boolean!

    createdAt: String!
    updatedAt: String!
  }

  type Room {
    id: Int!
    unreadTotal: Int!
    users: [User]
    messages: [Message]
    createdAt: String!
    updatedAt: String!
  }
`

module.exports = messagesTypeDefs