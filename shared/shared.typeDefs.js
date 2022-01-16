
const { gql } = require("apollo-server-express")


const sharedTypeDefs = gql`
  type MutationResult {
    ok: Boolean!
    error: String
  }
`

module.exports = sharedTypeDefs