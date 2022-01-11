
const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core")
const schema = require('./schema.js')


const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(),
  ]
})

const PORT = 4000
server.listen(PORT).then(console.log(`listening on http://localhost:${PORT}/`))