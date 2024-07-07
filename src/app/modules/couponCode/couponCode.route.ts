import express from "express";
import { couponCodeController } from "./couponCode.controller";
import auth from "../../middlewares/auth";
import { userRole } from "../../constant/constant";
export const couponRouter = express.Router();

couponRouter.post(
  "/createCoupon",
  auth(userRole.Seller, userRole.Manager, userRole.Admin),
  couponCodeController.createCouponIntoDB
);
couponRouter.get(
  "/getAllCoupon",
  auth(userRole.Seller, userRole.Manager, userRole.Admin),
  couponCodeController.getAllCouponIntoDB
);
couponRouter.get(
  "/getSingleCoupon",auth(userRole.Seller, userRole.Manager, userRole.Admin),
  couponCodeController.getSingleCouponIntoDB
);
