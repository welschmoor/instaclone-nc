
const { gql } = require("apollo-server-express");

const editProfileQueries = gql`
  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  
  type Mutation {
    editProfile(
      fullName:  String
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
