require('dotenv').config()

const { subscribe, execute } = require('graphql')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { graphqlUploadExpress } = require("graphql-upload")
const { typeDefs, resolvers } = require('./schema.js')
const getUser = require('./users/users.utils.js')
const logger = require('morgan')
const path = require("path");
const { SubscriptionServer } = require('subscriptions-transport-ws');
const http = require('http')

//2
const pubsub = require('./pubsub.js')

const PORT = process.env.PORT

async function startServer() {
  const app = express()
  const httpServer = http.createServer(app)

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const server = new ApolloServer({
    schema,

    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({ settings: { "schema.polling.enable": false } }),
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            }
          };
        }
      }
    ],
    context: async ({ req }) => {
      currentUser = await getUser(req.headers.token)
      return { currentUser }
    }
  })

  await server.start()

  // None of them work:
  // app.use(express.static('uploads'))
  app.use('/static', express.static('uploads'))
  // app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
  app.use(graphqlUploadExpress())
  app.use(logger("tiny"))
  server.applyMiddleware({ app })

  const subscriptionServer = SubscriptionServer.create(
    {
      schema, execute, subscribe,
      onConnect: async ({ token }) => {
        if (!token) {
          throw new Error("401 unauthorized, can't listen to sub")
        }
        const currentUser = await getUser(token)
        return {currentUser}
      }
    },
    { server: httpServer, path: server.graphqlPath },
  );


  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
    );
    console.log(
      `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer();