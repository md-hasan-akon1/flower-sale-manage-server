import { Schema, model } from "mongoose";
import * as argon2 from "argon2";
import { IUser, UserModel } from "./user.interface";


const userSchema = new Schema<IUser,UserModel>({
  id: { type: String },
  name: { type: String, required: [true, "name is required"] },
  username: { type: String, required: [true, "username is required"] },
  email: { type: String, required: [true, "email is required"] },
  isMember: { type: Boolean, default:false},
  points: { type: Number,default:0 },
  role: {
    type: String,
    enum: ['Seller','Manager','Admin','User'],
  },
  password: { type: String, required: [true, "password is required"],select:0 },
  
},{timestamps:true});

userSchema.pre("save",async function(next){
this.password = await argon2.hash(this.password);
next()
})

userSchema.statics.isExistUSer=async function(username:string) {
  const isExistUser=await User.findOne({username})
  return isExistUser
}

export const User=model<IUser,UserModel>('User',userSchema)