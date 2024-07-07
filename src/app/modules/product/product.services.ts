import { JwtPayload } from "jsonwebtoken";
import { Product } from "./product.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createProductIntoDB = async (payload: JwtPayload) => {
  const result = await Product.create(payload);
  return result;
};
const deleteProductIntoDB = async (payload: string[]) => {
const result=await Product.deleteMany({_id:payload})
 

  return result;
};
const updateProductIntoDB = async (id: string, payload: JwtPayload) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "product not found");
  }
  const result = await Product.findByIdAndUpdate(id, payload);
  if (!result) {
    throw new AppError(httpStatus.FAILED_DEPENDENCY, "delete failed");
  }
  const updatedProduct = await Product.findById(id);
  return updatedProduct;
};
const getAllProductIntoDB = async () => {
  const result = await Product.find();

  return result;
};
const getSingleProductIntoDB = async (id: string) => {
  const result = await Product.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "product not found");
  }
  return result;
};

export const productServices = {
  createProductIntoDB,
  deleteProductIntoDB,
  updateProductIntoDB,
  getAllProductIntoDB,
  getSingleProductIntoDB,
};
