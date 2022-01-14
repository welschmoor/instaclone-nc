const client = require('../../client.js')


const dummyResolvers = {
  Mutation: {
    kek: () => "kek"
  }

}

module.exports = dummyResolvers 