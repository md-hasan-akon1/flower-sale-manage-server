import { userServices } from "./user.services";
import catchAsync from "../../utility/catchAsync";
import sendResponse from "../../utility/sendResponse";
import httpStatus from "http-status";
import { config } from "../../config/config";

const createUserIntoDB = catchAsync(async (req, res) => {
  const result = await userServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user registration successfully",
    data: result,
  });
});
const userLogin = catchAsync(async (req, res) => {
  const result = await userServices.userLogin(req.body);
  const { accessToken, refreshToken } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
    //sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user Login successfully",
    data: accessToken,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await userServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Access token is retrieved successfully!",
    data: result,
  });
});
const getAllUserWithOutAdmin = catchAsync(async (req, res) => {
  const result = await userServices.getAllUserWithOutAdmin();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully!",
    data: result,
  });
});
const getAllUsers = catchAsync(async (req, res) => {
  const result = await userServices.getAllUsers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully!",
    data: result,
  });
});
const getMe= catchAsync(async (req, res) => {
  const username=req.params.username

  const result = await userServices.getMe(username);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully!",
    data: result,
  });
});
const updateRole = catchAsync(async (req, res) => {
  const result = await userServices.updateRole(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully!",
    data: result,
  });
});
const getMemberShip = catchAsync(async (req, res) => {
  const result = await userServices.getMemberShip(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User got member successfully!",
    data: result,
  });
});

export const userControllers = {
  createUserIntoDB,
  userLogin,
  refreshToken,
  getAllUserWithOutAdmin,
  updateRole,
  getMemberShip,
  getMe,
  getAllUsers 
};
