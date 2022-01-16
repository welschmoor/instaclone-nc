const { withFilter } = require("graphql-subscriptions")
const NEW_MESSAGE = require("../../constants")
const pubsub = require("../../pubsub")

const roomUpdatesResolvers = {
  Subscription: {
    roomUpdates: {
      // the second parameter function returns true or false

      subscribe: async (root, args, context, info) => {
        const room = await client.room.findUnique({ where: { id: args.id }, select: { id: true } })
        if (!room) {
          throw new Error("This chat room is unaccessible to you")
        }
        return withFilter(
          () => pubsub.asyncIterator(NEW_MESSAGE),
          (payload, { id }) => {
            return payload.roomUpdates.roomId === id
          }
        )(root, args, context, info)

      }

      // or:
      // subscribe: withFilter(
      //   () => pubsub.asyncIterator(NEW_MESSAGE),
      //   (payload, { id }) => {
      //     return payload.roomUpdates.roomId === id
      //   }
      // ),
      // or:
      // subscribe: () => pubsub.asyncIterator(NEW_MESSAGE) // (NEW_MESSAGE) without []
    }
  }
}
module.exports = roomUpdatesResolvers