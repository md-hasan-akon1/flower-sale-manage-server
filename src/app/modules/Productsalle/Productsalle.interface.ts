import { Date, Types } from "mongoose";


export interface IProductSale{
        productId?:Types.ObjectId,
        quantity:number,
        buyerName:string,
        saleDate:Date
        couponCode?:string,
        buyerUserName?:string,
        sellerName:string,
        sellerRole:string,
        price:number,
        usePoint:boolean
}