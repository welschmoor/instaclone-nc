const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core")
const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient()

const typeDefs = gql`
  type Movie {
    id: Int!
    title: String!
    year: Int!
    genre: String
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    movies: [Movie]
    movie(id: Int!): Movie
  }

  type Mutation {
    createMovie(title: String!, year: Int!, genre: String): Movie
    deleteMovie(id: Int!): Movie
    updateMovie(id: Int! year: Int!): Movie
  }
`

const resolvers = {
  Query: {
    movies: () => client.movie.findMany(),
    movie: (root, { id }) => client.movie.findUnique({ where: { id: id } }),
  },
  Mutation: {
    createMovie: (root, { title, year, genre }) =>
      client.movie.create({
        data: {
          title: title,
          year: year,
          genre: genre,
        }
      })
    ,

    deleteMovie: (root, { id }) => {
      return client.movie.delete({ where: { id } })
    },

    updateMovie: (root, { id, year }) => {
      return client.movie.update({ where: { id }, data: { year } })
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