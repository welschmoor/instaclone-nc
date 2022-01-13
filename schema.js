const { loadFilesSync } = require('@graphql-tools/load-files')
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge')

// look at files which end in typeDefs.js
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`)
const typeDefs = mergeTypeDefs(loadedTypes)

// look at files which end in either queires or mutations.js in all folders:
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.{queries,mutations,resolvers}.js`)
const resolvers = mergeResolvers(loadedResolvers)


const typeDefsAndResolvers = {
  typeDefs,
  resolvers
}
module.exports = typeDefsAndResolvers














//////////////////
// OLD CODE

// we no longer use this schema, because it does not provide us with fileupload? I don't remember:
// const { makeExecutableSchema } = require('@graphql-tools/schema')

// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers
// })