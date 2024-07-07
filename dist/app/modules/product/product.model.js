"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
// Define a Mongoose schema for the item
const ProductSchema = new mongoose_1.Schema({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    bloomDate: { type: Date, required: true },
    color: { type: [String], default: [] },
    type: { type: String },
    size: { type: String },
    fragrance: { type: String },
    arrangementStyle: { type: String },
    occasion: { type: String },
    customAttributes: { type: mongoose_1.Schema.Types.Mixed },
});
// ProductSchema.pre('save',async function(next) {
//   const {_id,...rest}=this
//   next(rest)
// })
// Define a Mongoose model for the item
exports.Product = (0, mongoose_1.model)("Product", ProductSchema);
