/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IUser, TLoginData } from "./user.interface";
import { User } from "./user.model";
import * as argon2 from "argon2";

import { config } from "../../config/config";
import { createToken } from "../../utility/createToken";
import { verifyToken } from "./use.utility";

const createUserIntoDB = async (payload: IUser) => {
  const result = await User.create(payload);
  const { password, ...remaining } = result.toObject();
  return remaining;
};

const userLogin = async (payload: TLoginData) => {
  const user = await User.findOne({ username: payload.username }).select(
    "+password"
  );
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found");
  }

  const matchPass = await argon2.verify(user.password, payload.password);
  if (!matchPass) {
    throw new AppError(httpStatus.BAD_REQUEST, "password did not match");
  }

  const data = {
    username: user.username,
    email: user.email,
    role: user.role,
    name: user.name,
  };

  const accessToken = await createToken(data, "1d");
  const refreshToken = await createToken(data, "30d");

  return { accessToken, refreshToken };
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.access_token_secrete as string);

  const { username } = decoded;

  // checking if the user is exist
  const user = await User.findOne({ username: username });

  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is not found !");
  }
  const data = {
    username: user.username,
    email: user.email,
    role: user.role,
    name: user.name,
  };

  const accessToken = createToken(data, "30");

  return {
    accessToken,
  };
};

const getAllUsers = async () => {
  const result = await User.find();
  return result;
};
const getAllUserWithOutAdmin = async () => {
  const result = await User.find({ role: { $ne: "Admin" } });
  return result;
};
const getMe = async (payload:string) => {
  const result = await User.findOne({username:payload});
  if(!result){
    throw new AppError(httpStatus.NOT_FOUND, "user not Found");
  }
  return result;
};
const updateRole = async (payload: { id: string; role: string }) => {
  const user = await User.findOne({ _id: payload.id });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user not Found");
  }
  const result = await User.findByIdAndUpdate(
    { _id: payload.id },
    { role: payload.role }
  );
  return result;
};
const getMemberShip = async (payload: { username: string }) => {
  const user = await User.findOne({ username: payload.username });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user not Found");
  }
  if (user.isMember) {
    throw new AppError(httpStatus.CONFLICT, "User All ready member");
  }
  const result = await User.findOneAndUpdate(
    { username: payload.username },
    { isMember: true,points:200 }
  );
  return result;
};

export const userServices = {
  createUserIntoDB,
  userLogin,
  refreshToken,
 getAllUserWithOutAdmin,
  updateRole,
  getMemberShip,
  getMe,
  getAllUsers
};
