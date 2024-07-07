import httpStatus from "http-status";
import catchAsync from "../../utility/catchAsync";
import sendResponse from "../../utility/sendResponse";
import { productServices } from "./product.services";

const createProductIntoDB = catchAsync(async (req, res) => {
  const result = await productServices.createProductIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user Login successfully",
    data: result,
  });
});
const deleteProductIntoDB = catchAsync(async (req, res) => {
        const data =req.body
  const result = await productServices.deleteProductIntoDB(data );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "delete product successfully",
    data: result,
  });
});
const updateProductIntoDB = catchAsync(async (req, res) => {
        const id =req.params.id
        const data=req.body
  const result = await productServices.updateProductIntoDB(id,data );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " product updated successfully",
    data: result,
  });
});
const getAllProductIntoDB = catchAsync(async (req, res) => {
     
  const result = await productServices.getAllProductIntoDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " product retrieved successfully",
    data: result,
  });
});
const getSingleProductIntoDB = catchAsync(async (req, res) => {
     const id =req.params.id
    
  const result = await productServices.getSingleProductIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " product retrieved successfully",
    data: result,
  });
});
export const productControllers = { createProductIntoDB,deleteProductIntoDB,updateProductIntoDB,getAllProductIntoDB ,getSingleProductIntoDB};
