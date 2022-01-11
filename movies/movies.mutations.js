const client = require('../client.js')

const resolverMutation = {
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


module.exports = resolverMutation