
const { gql } = require("apollo-server")

const editProfileQueries = gql`
  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  
  type Mutation {
    editProfile(
      firstName: String 
      lastName: String 
      username: String 
      email: String 
      password: String
      bio: String
      avatar: Upload
      ): EditProfileResult!
  }

`
module.exports = editProfileQueries
