

const { gql } = require("apollo-server-express")


const meTypeDefs = gql`
  type Query {
    me: User
  }
`

module.exports = meTypeDefs