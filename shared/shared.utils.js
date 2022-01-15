
const AWS = require('aws-sdk')

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,

  },

})


const uploadToS3 = async (file, userId) => {
  const { filename, createReadStream } = await file
  const readStream = createReadStream()
  const objectName = `${userId}-${Date.now()}-${filename}`


  const uploadedFile = await new AWS.S3().upload({

    Bucket: 'instacloneupload1337',
    Key: objectName, // this is the name of the file
    ACL: "public-read", // means anyone can read
    Body: readStream, // this is the stream
  }).promise()

  console.log(uploadedFile)
  return uploadedFile.Location
}

module.exports = uploadToS3