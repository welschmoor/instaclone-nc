const { gql } = require("apollo-server-express")

const seeRoomsQuery = gql`
  type Dummy {
    ok: Boolean!
  }

  type Query {
    seeRooms: [Room]
  }
`

module.exports = seeRoomsQuery