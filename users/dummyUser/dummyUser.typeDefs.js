const { gql } = require("apollo-server-express")

const dummyUserUserQuery = gql`
  type Dummy {
    ok: Boolean!
  }

  type Mutation {
    kek: String!
  }
`

module.exports = dummyUserUserQuery