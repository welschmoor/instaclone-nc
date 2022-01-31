const { withFilter } = require("graphql-subscriptions")
const NEW_MESSAGE = require("../../constants")
const pubsub = require("../../pubsub")
const client = require('../../client.js')


const roomUpdatesResolvers = {
  Subscription: {
    roomUpdates: {
      // the second parameter function returns true or false

      subscribe: async (root, args, context, info) => {
        const room = await client.room.findFirst({
          where: { id: args.id, users: { some: { id: context.currentUser.id } } }, select: { id: true }
        })

        if (!room) {
          throw new Error("This chat room is unaccessible to you")
        }
        // the following happens after the user starts to listen
        // here we can add another room check (room code above)
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