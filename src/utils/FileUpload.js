import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary'
import { response } from 'express';
import { loadEnvFile } from 'process';


// configure the cloudinary setup 

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: print.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary  = async (localFilePath) =>{
  try {
    if(!localFilePath) return null;
  const response = await cloudinary.uploader.upload(localFilePath,{
      resource_type:"auto"

      // file has been  uploaded succesfully
    })
     console.log("file is uploaded on cloudinary",response.url);
     return response ;
  } catch (error) {

      fs.unlinkSync(localFilePath) // remove the localy saved temporary file as the upload got failed 
      return null;
            
    
  }
}
export default uploadOnCloudinary
