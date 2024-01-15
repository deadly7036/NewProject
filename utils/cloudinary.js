import {v2 as cloudinary} from "cloudinary";
import fs from "fs"
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});



const uploadOnCloudinary = async (localFilePath) => {
   try {
if(!localFilePath) return null
  const resp = await cloudinary.uploader.upload(localFilePath,{
  resouce_type: "auto",
  })
     console.log("file is uploaded",resp)
     return resp
   }catch(error) {
     fs.unlinkSync(localFilePath)
     return null
   }
}




export {uploadOnCloudinary}