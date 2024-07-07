"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponCodeServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const couponCode_model_1 = require("./couponCode.model");
const createCouponIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield couponCode_model_1.CouponCode.create(data);
    return result;
});
const getAllCouponIntoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield couponCode_model_1.CouponCode.find();
    return result;
});
const getSingleCouponIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield couponCode_model_1.CouponCode.findOne(payload);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, "Unvalide Coupon");
    }
    return result;
});
exports.couponCodeServices = { createCouponIntoDB, getAllCouponIntoDB, getSingleCouponIntoDB };
