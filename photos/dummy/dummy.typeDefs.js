const { gql } = require("apollo-server-express")

const dummyQuery = gql`
  type Dummy {
    ok: Boolean!
  }

  type Mutation {
    kek: String!
  }
`

module.exports = dummyQuery