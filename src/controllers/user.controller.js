import asyncHandler from "../utils/asyncHandler.js";

import ApiError from '../utils/ApiError.js'
import User from '../models/user.model.js'
import multer  from "multer";
import uploadOnCloudinary  from "../utils/FileUpload.js";
import ApiResponse from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req,res)=>{
    
    //get the user details from fronted 
    // validation - not empty 
    // check if user already exists :username ,email 
    // check for images ,check for avatar 
    // upload them to cloudinary ,avatar
    // create user object - create entry in db 
    // remove password and refresh token field from response 
    
    const{fullName,email,username,password} = req.body;
    if(
        [fullName,email,username,password].some((field)=>
        field?.trim()=== "" )
    ){
        throw new ApiError(400,"All fields are required.");
    }
    
     const existedUser = User.findOne({
        $or:[{username},{email}]
     })
     console.log(existedUser);
     
    if(existedUser){
        throw new ApiError(409,"User with email or username already exists")
    }
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar files is required.")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }

   const user = await  User.create({
        fullName,
        avatar: avatar.url,
        coverImage : coverImage?.url || "",
        email,
        password,
        username : username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser) {
        throw new ApiError(500,"something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered SuccessFully ")
    )
})


export default registerUser