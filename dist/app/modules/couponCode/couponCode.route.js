"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponRouter = void 0;
const express_1 = __importDefault(require("express"));
const couponCode_controller_1 = require("./couponCode.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const constant_1 = require("../../constant/constant");
exports.couponRouter = express_1.default.Router();
exports.couponRouter.post("/createCoupon", (0, auth_1.default)(constant_1.userRole.Seller, constant_1.userRole.Manager, constant_1.userRole.Admin), couponCode_controller_1.couponCodeController.createCouponIntoDB);
exports.couponRouter.get("/getAllCoupon", (0, auth_1.default)(constant_1.userRole.Seller, constant_1.userRole.Manager, constant_1.userRole.Admin), couponCode_controller_1.couponCodeController.getAllCouponIntoDB);
exports.couponRouter.get("/getSingleCoupon", (0, auth_1.default)(constant_1.userRole.Seller, constant_1.userRole.Manager, constant_1.userRole.Admin), couponCode_controller_1.couponCodeController.getSingleCouponIntoDB);
