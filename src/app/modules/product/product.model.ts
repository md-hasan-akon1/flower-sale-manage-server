import { Schema, model } from "mongoose";
import { IProduct } from "./product.inteface";

// Define a Mongoose schema for the item
const ProductSchema = new Schema<IProduct>({
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
  customAttributes: { type: Schema.Types.Mixed },
});
// ProductSchema.pre('save',async function(next) {
//   const {_id,...rest}=this
//   next(rest)
// })
// Define a Mongoose model for the item
export const Product = model<IProduct>("Product", ProductSchema);

