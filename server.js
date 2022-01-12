require('dotenv').config()

const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core");
const { graphqlUploadExpress } = require("graphql-upload")
const { typeDefs, resolvers } = require('./schema.js')
const getUser = require('./users/users.utils.js')
const logger = require('morgan')
const path = require("path");


const PORT = process.env.PORT

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({ settings: { "schema.polling.enable": false } }),
    ],
    context: async ({ req }) => {
      currentUser = await getUser(req.headers.token)
      return { currentUser }
    }
  })

  await server.start()
  const app = express()
  // None of them work:
  app.use(express.static('uploads'))
  // app.use('/uploads', express.static('uploads')) 
  // app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
  app.use(graphqlUploadExpress())
  app.use(logger("tiny"))
  server.applyMiddleware({ app })

  await new Promise((r) => app.listen({ port: PORT }, r))
  console.log(`listening on http://localhost:${PORT}${server.graphqlPath}`)
}

startServer();