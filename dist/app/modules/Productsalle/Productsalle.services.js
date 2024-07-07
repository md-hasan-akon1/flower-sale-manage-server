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
exports.saleServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const product_model_1 = require("../product/product.model");
const mongoose_1 = __importDefault(require("mongoose"));
const Productsalle_model_1 = require("./Productsalle.model");
const couponCode_model_1 = require("../couponCode/couponCode.model");
const user_model_1 = require("../users/user.model");
const createSaleProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const product = yield product_model_1.Product.findOne({ _id: payload.productId });
        if (!product) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Product not FOund");
        }
        if (payload.quantity > product.quantity) {
            throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, "sale quantity must be less then Product quantity");
        }
        const afterSale = product.quantity - payload.quantity;
        if (afterSale <= 0) {
            yield product_model_1.Product.findByIdAndDelete([{ _id: payload.productId }], {
                session,
            });
        }
        yield product_model_1.Product.findByIdAndUpdate({ _id: payload.productId }, { quantity: afterSale }, { session });
        if (payload.buyerUserName) {
            const user = yield user_model_1.User.findOne({ username: payload.buyerUserName });
            if (!user) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not Found");
            }
            console.log(payload.usePoint);
            if (payload.usePoint && user.isMember) {
                const TakaToPoint = Math.ceil(Number(payload.price) * 3);
                if (TakaToPoint > user.points) {
                    yield user_model_1.User.findOneAndUpdate({ username: user.username }, { points: 0 }, { upsert: true });
                }
                else {
                    const point = Number(user.points) - Number(TakaToPoint);
                    yield user_model_1.User.findOneAndUpdate({ username: user.username }, { points: point }, { session });
                }
            }
            if (payload.buyerUserName) {
                const user2 = yield user_model_1.User.findOne({ username: payload.buyerUserName });
                const points = Math.ceil(Number(user2.points) + (Number(Number(payload.price) / 100)));
                yield user_model_1.User.findOneAndUpdate({ username: payload.buyerUserName }, { points: points });
            }
        }
        if (payload.couponCode) {
            const couponVerify = yield couponCode_model_1.CouponCode.findOne({
                couponCode: payload.couponCode,
            });
            if (!couponVerify) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Coupon is not Verify");
            }
            const discountAmount = (Number(payload.price) * Number(couponVerify.discountNumber)) / 100;
            payload.price = Math.floor(Number(payload.price) - Number(discountAmount));
        }
        const result = yield Productsalle_model_1.ProductSale.create([payload], { session });
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const filterByDate = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let date;
    if (payload.data === "daily") {
        const currentDate = new Date();
        const sevenDaysAgo = new Date(currentDate);
        sevenDaysAgo.setDate(currentDate.getDate() - 1);
        date = sevenDaysAgo;
    }
    else if (payload.data === "weekly") {
        const currentDate = new Date();
        const sevenDaysAgo = new Date(currentDate);
        sevenDaysAgo.setDate(currentDate.getDate() - 7);
        date = sevenDaysAgo;
    }
    else if (payload.data === "monthly") {
        const currentDate = new Date();
        const sevenDaysAgo = new Date(currentDate);
        sevenDaysAgo.setDate(currentDate.getDate() - 30);
        date = sevenDaysAgo;
    }
    else if (payload.data === "yearly") {
        const currentDate = new Date();
        const sevenDaysAgo = new Date(currentDate);
        sevenDaysAgo.setDate(currentDate.getDate() - 365);
        date = sevenDaysAgo;
    }
    let result;
    result = yield Productsalle_model_1.ProductSale.find();
    if (date) {
        result = yield Productsalle_model_1.ProductSale.find({
            $and: [{ saleDate: { $gt: date } }],
        }).sort({ saleDate: -1 });
    }
    return result;
});
exports.saleServices = {
    createSaleProduct,
    filterByDate,
};
