require('dotenv').config()

const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core");

const { typeDefs, resolvers } = require('./schema.js')
const getUser = require('./users/users.utils.js')

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

const PORT = process.env.PORT
server.listen(PORT).then(console.log(`listening on http://localhost:${PORT}/`))