
const { gql } = require("apollo-server-express")


const sharedTypeDefs = gql`
  type MutationResponse {
    ok: Boolean!
    error: String
  }
`

module.exports = sharedTypeDefs