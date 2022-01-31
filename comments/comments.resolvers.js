

const commentsResolvers = {
  Comment: {
    isMine: async (root, _, {currentUser}) => {
      /* CHECK LOGIN */  if (!currentUser || currentUser === null) {
        return false
      }

      if (currentUser.id === root.userId) {
        return true
      }
      return false
    }
  }
}

module.exports = commentsResolvers