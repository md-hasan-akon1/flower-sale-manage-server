"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSale = void 0;
const mongoose_1 = require("mongoose");
const saleProductSchema = new mongoose_1.Schema({
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: [true, 'quantity is required'] },
    buyerName: { type: String, required: [true, 'buyer name is required'] },
    saleDate: { type: Date, required: [true, 'date is required'] },
    sellerName: { type: String, required: [true, 'seller name is required'] },
    price: { type: Number, required: [true, 'price is required'] },
    sellerRole: { type: String, required: [true, 'role is required'] },
    buyerUserName: { type: String },
    couponCode: { type: String },
    usePoint: { type: String }
});
exports.ProductSale = (0, mongoose_1.model)("ProductSale", saleProductSchema);
