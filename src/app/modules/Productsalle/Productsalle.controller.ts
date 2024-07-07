import httpStatus from "http-status";
import catchAsync from "../../utility/catchAsync";
import sendResponse from "../../utility/sendResponse";
import { saleServices } from "./Productsalle.services";


const createSaleProduct = catchAsync(async (req, res) => {
        const data=req.body
        
  const result = await saleServices.createSaleProduct(data) ;
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "sale successfully",
    data: result,
  });
});
const filterByDate = catchAsync(async (req, res) => {
        const data =req.query 
      
  const result = await saleServices.filterByDate(data) ;
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "get  sale  history successfully",
    data: result,
  });
});

export const saleControllers = {  createSaleProduct ,filterByDate};