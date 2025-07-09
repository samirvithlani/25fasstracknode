const cloundinary = require("cloudinary").v2
require("dotenv").config()
const uploadToCloundinary = async(path)=>{

    cloundinary.config({
        cloud_name:process.env.CLOUD_NAME,
        api_key:process.env.API_KEY,
        api_secret:process.env.API_SECRET
    })

    const cloudinaryResponse = await cloundinary.uploader.upload(path)
    return cloudinaryResponse

}
module.exports = uploadToCloundinary