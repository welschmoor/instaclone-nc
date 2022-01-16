const { gql } = require("apollo-server-express")

const seeRoomQuery = gql`
  type Query {
    seeRoom(id: Int!): Room
  }
` 

module.exports = seeRoomQuery