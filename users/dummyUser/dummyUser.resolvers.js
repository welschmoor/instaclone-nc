const client = require('../../client.js')


const dummyUserResolvers = {
  Mutation: {
    kek: () => "kek"
  }

}

module.exports = dummyUserResolvers 