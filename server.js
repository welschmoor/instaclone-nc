require('dotenv').config()

const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core");
const { config } = require('dotenv');
const schema = require('./schema.js')
const getUser = require('./users/users.utils.js')

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({ settings: { "schema.polling.enable": false } }),
  ],
  context: async ({ req }) => {
    currentUser = await getUser(req.headers.token)
    console.log("<>", currentUser)
    return { currentUser }
  }
})

const PORT = process.env.PORT
server.listen(PORT).then(console.log(`listening on http://localhost:${PORT}/`))