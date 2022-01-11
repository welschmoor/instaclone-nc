const client = require('../client.js')

const resolverQuery = {
  Query: {
    movies: () => client.movie.findMany(),
    movie: (root, { id }) => client.movie.findUnique({ where: { id: id } }),
  },
}

module.exports = resolverQuery