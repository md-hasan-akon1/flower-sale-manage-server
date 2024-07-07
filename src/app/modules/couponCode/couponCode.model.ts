import { Schema, model } from "mongoose";
import { TCouponCode } from "./couponCode.interface";

 const couponSchema=new Schema<TCouponCode>({
        couponCode:{type:String},
        discountNumber:{type:String}
})

export const CouponCode= model<TCouponCode>("couponCode",couponSchema)