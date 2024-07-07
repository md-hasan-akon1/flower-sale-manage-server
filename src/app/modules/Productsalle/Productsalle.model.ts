import { Schema, model } from "mongoose";
import { IProductSale } from "./Productsalle.interface";



const saleProductSchema=new Schema({
        productId:{type:Schema.Types.ObjectId,ref:'Product'},
        quantity:{type:Number,required:[true,'quantity is required']},
        buyerName:{type:String,required:[true,'buyer name is required']},
        saleDate:{type:Date,required:[true,'date is required']},
        sellerName:{type:String,required:[true,'seller name is required']},
        price:{type:Number,required:[true,'price is required']},
        sellerRole:{type:String,required:[true,'role is required']},
        buyerUserName:{type:String},
        couponCode:{type:String},
        usePoint:{type:String}
})
export const ProductSale=model<IProductSale>("ProductSale",saleProductSchema)