const NEW_MESSAGE = require("../../constants")
const pubsub = require("../../pubsub")

const roomUpdatesResolvers = {
  Subscription: {
    roomUpdates: {
      subscribe: () => pubsub.asyncIterator(NEW_MESSAGE) // (NEW_MESSAGE) without []
    }
  }
}

module.exports = roomUpdatesResolvers