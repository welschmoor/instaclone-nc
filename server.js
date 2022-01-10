import { PrismaClient } from '@prisma/client';
import { ApolloServer, gql } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"

const client = new PrismaClient()

const typeDefs = gql`
  type Movie {
    id: Int!
    title: String
    year: Int
  }

  type Query {
    movies: [Movie]
    movie: Movie
  }

  type Mutation {
    createMovie(title: String!): Boolean
    deleteMovie(title: String!): Boolean!
  }
`

const resolvers = {
  Query: {
    movies: () => ["bur", "kek"],
    movie: () => ({ title: "kek", year: 2022 })
  },
  Mutation: {
    createMovie: (root, { title }) => {
      console.log(title)
      return true
    },
    deleteMovie: (root, { title }) => {
      console.log(title)
      return true;
    }
  },
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(),
  ]
})

const PORT = 4000
server.listen(PORT).then(console.log(`listening on http://localhost:${PORT}/`))