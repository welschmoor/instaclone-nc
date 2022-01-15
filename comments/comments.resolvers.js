

const commentsResolvers = {
  Comment: {
    isMine: async (root, _, context) => {
      /* CHECK LOGIN */  if (!currentUser || currentUser === null) {
        return false
      }

      if (context.currentUser.id === root.userId) {
        return true
      }
      return false
    }
  }
}

module.exports = commentsResolvers