import httpStatus from "http-status"
import AppError from "../../errors/AppError"
import { TCouponCode } from "./couponCode.interface"
import { CouponCode } from "./couponCode.model"

const createCouponIntoDB=async(data:TCouponCode)=>{
const result=await CouponCode.create(data)
return result
}
const getAllCouponIntoDB=async()=>{
const result=await CouponCode.find()
return result
}
const getSingleCouponIntoDB=async(payload:any)=>{
const result=await CouponCode.findOne(payload)
if(!result){
        throw new AppError(httpStatus.NOT_ACCEPTABLE,"Unvalide Coupon")
}

return result
}

export const couponCodeServices={createCouponIntoDB,getAllCouponIntoDB,getSingleCouponIntoDB}