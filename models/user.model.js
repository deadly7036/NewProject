import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import  mongooseAggregate from "mongoose-aggregate-paginate-v2";

const userSchema = new Schema({
   watchHistory: [{
     type: Schema.Types.ObjectId,
      ref: "Video"
   }],
   username : {
     type:String,
     required: [true,"Please enter a username" ],
      lowercase:true,
      unique:true,
      trim:true,
      index:true,
   },
  email : {
     type:String,
     required: [true,"Please enter a email" ],
      lowercase:true,
      unique:true,
  },
  fullName: {
    type:String,
    required: [true,"Please enter a Fullname" ],
    index:true,
  },
  avatar : {
     type:String,
      required:true,
  },
  coverImage: {
    type: String
  },
  password : {
    type:String,
    required: [true,"Please enter a password" ],
  },
  refreshToken: {
    type:String,
  }
},{
  timeStamps:true
})
userSchema.plugin(mongooseAggregate);

userSchema.pre("save",async function (next){
  if(!this.isModified("password") {
    next();
  }
  this.password = await bcrypt.hash(this.password,10);
  next()
})

userSchema.methods.isPasswordCorrect = async function (password){
  return await bcrypt.compare(password,this.password);
  }
userSchema.methods.generateAccessToken = function () {
  return jwt.sign({
     _id:this._id,
     username:this.username,
     fullName:this.fullName,
     email:this.email
  },process.env.AccesToken,{
    expiresIn: process.env.Expiry
  })
}
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({
     _id:this._id,  
  },process.env.RefreshToken,{
     expiresIn: process.env.RefreshExpToken
  })
}
export const User = mongoose.model("User",userSchema);




