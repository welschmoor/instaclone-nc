const { gql } = require("apollo-server-express")

const sendMessageQuery = gql`
  type Mutation {
    sendMessage(payload: String!, roomId: Int, userId: Int): MutationResult!
  }
`

module.exports = sendMessageQuery