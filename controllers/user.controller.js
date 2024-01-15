import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import {ApiResponse} from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
//get information from frontend
  // validation => ""
  // check if user already exist
  // upload images check avatar image
  // upload them on cloudinary and check avatar
  // create user in db
  // remove password and refreshToken from response
  // check for user creation
  // return response
const registerUser = asyncHandler(async (req, res) => {
  
  const { fullName, username, email, password } = req.body;
  if (
    [fullName, email, password, username].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "Please fill all fields");
  }
   console.log(fullName,username,email, password)

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  console.log(existedUser)
  if (existedUser) {
    throw new ApiError(409, "username or password already exists");
  }
   const avatarLocalPath = req.files?.avatar[0]?.path;
   console.log(req.files)
  const coverLocalPath = req.files?.coverImage[0]?.path;
   console.log(req.files.coverImage)
  
  const avatar = await uploadOnCloudinary(avatarLocalPath)
   console.log(avatar)
  const coverImage = await uploadOnCloudinary(coverLocalPath)
  if(!avatar) {
    throw new ApiError(400, "avatar is not uploaded")
  }
  const user = await User.create({
    fullName,
    username: username.toLowerCase(),
    email,
    password,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
  });

  const  createdUser = await User.findById(user._id).select("-password -refreshToken")
    console.log(createdUser)
   if(!createdUser) {
     throw new ApiError(400, "user is not created")
   }
  res.status(201).json(
     throw new ApiResponse(200,createdUser,"user created successfully")
  )
  
});

export { registerUser };
