const { gql } = require("apollo-server-express")

const deleteAccountQuery = gql`
  type deleteAccountResult {
    ok: Boolean!
  }

  type Mutation {
    deleteAccount(id: Int!): deleteAccountResult!
  }
`

module.exports = deleteAccountQuery