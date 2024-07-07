"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponCode = void 0;
const mongoose_1 = require("mongoose");
const couponSchema = new mongoose_1.Schema({
    couponCode: { type: String },
    discountNumber: { type: String }
});
exports.CouponCode = (0, mongoose_1.model)("couponCode", couponSchema);
