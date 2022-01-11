const { loadFilesSync } = require('@graphql-tools/load-files')
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge')
const { makeExecutableSchema } = require('@graphql-tools/schema')

// look at files which end in typeDefs.js
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`)
const typeDefs = mergeTypeDefs(loadedTypes)

// look at files which end in either queires or mutations.js in all folders:
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.{queries,mutations}.js`)
const resolvers = mergeResolvers(loadedResolvers)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

module.exports = schema