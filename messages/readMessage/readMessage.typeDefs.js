const { gql } = require("apollo-server-express")

const readMessageQuery = gql`

  type Mutation {
    readMessage(id: Int!): MutationResult!
  }
`

module.exports = readMessageQuery