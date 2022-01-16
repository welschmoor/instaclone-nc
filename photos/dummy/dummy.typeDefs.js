const { gql } = require("apollo-server-express")

const dummyQuery = gql`
  type Dummy {
    ok: Boolean!
  }

  type Query_or_Mutation {
    kek: String!
  }
`

module.exports = dummyQuery