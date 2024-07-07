import httpStatus from "http-status";
import catchAsync from "../../utility/catchAsync";

import sendResponse from "../../utility/sendResponse";
import { couponCodeServices } from "./couponCode.servise";

const createCouponIntoDB = catchAsync(async (req, res) => {
  const result = await couponCodeServices.createCouponIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Create coupon code successfully",
    data: result,
  });
});
const getAllCouponIntoDB = catchAsync(async (req, res) => {
  const result = await couponCodeServices.getAllCouponIntoDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "retrived coupon code successfully",
    data: result,
  });
});
const getSingleCouponIntoDB = catchAsync(async (req, res) => {
  const result = await couponCodeServices.getSingleCouponIntoDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "verify coupon code successfully",
    data: result,
  });
});

export const couponCodeController = {
  getSingleCouponIntoDB,
  createCouponIntoDB,
  getAllCouponIntoDB,
};
