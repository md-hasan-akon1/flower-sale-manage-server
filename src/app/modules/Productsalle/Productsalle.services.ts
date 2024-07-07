import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Product } from "../product/product.model";
import { IProductSale } from "./Productsalle.interface";
import mongoose from "mongoose";
import { ProductSale } from "./Productsalle.model";
import { CouponCode } from "../couponCode/couponCode.model";
import { User } from "../users/user.model";

const createSaleProduct = async (payload: IProductSale) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const product = await Product.findOne({ _id: payload.productId });
    
    if (!product) {
      throw new AppError(httpStatus.NOT_FOUND, "Product not FOund");
    }
    if (payload.quantity > product.quantity) {
      throw new AppError(
        httpStatus.NOT_ACCEPTABLE,
        "sale quantity must be less then Product quantity"
      );
    }
    const afterSale = product.quantity - payload.quantity;
    if (afterSale <= 0) {
      await Product.findByIdAndDelete([{ _id: payload.productId }], {
        session,
      });
    }

    await Product.findByIdAndUpdate(
      { _id: payload.productId },
      { quantity: afterSale },
      { session }
    );
if(payload.buyerUserName){
  const user = await User.findOne({ username: payload.buyerUserName });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not Found");
  }
  console.log(payload.usePoint)
  if(payload.usePoint&&user.isMember ){
    const TakaToPoint=Math.ceil(Number(payload.price)*3)
    if(TakaToPoint>user.points!){

    await User.findOneAndUpdate({username:user.username},{points:0},{upsert:true})
    }else{
      const point=Number(user.points)-Number(TakaToPoint)
      await User.findOneAndUpdate({username:user.username},{points:point},{session})
    }
  
  }
  if (payload.buyerUserName) {
    const user2=await User.findOne({username:payload.buyerUserName})
    const points=Math.ceil(Number(user2!.points)+(Number(Number(payload.price)/100)))
    await User.findOneAndUpdate({username:payload.buyerUserName},{points:points})
  }
}
    if (payload.couponCode) {
      const couponVerify = await CouponCode.findOne({
        couponCode: payload.couponCode,
      });
      if (!couponVerify) {
        throw new AppError(httpStatus.NOT_FOUND, "Coupon is not Verify");
      }
      const discountAmount =
        (Number(payload.price) * Number(couponVerify.discountNumber)) / 100;
      payload.price = Math.floor(
        Number(payload.price) - Number(discountAmount)
      );
    }

    const result = await ProductSale.create([payload], { session });
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const filterByDate = async (payload: any) => {
  let date;
  if (payload.data === "daily") {
    const currentDate = new Date();
    const sevenDaysAgo = new Date(currentDate);
    sevenDaysAgo.setDate(currentDate.getDate() - 1);
    date = sevenDaysAgo;
  } else if (payload.data === "weekly") {
    const currentDate = new Date();
    const sevenDaysAgo = new Date(currentDate);
    sevenDaysAgo.setDate(currentDate.getDate() - 7);
    date = sevenDaysAgo;
  } else if (payload.data === "monthly") {
    const currentDate = new Date();
    const sevenDaysAgo = new Date(currentDate);
    sevenDaysAgo.setDate(currentDate.getDate() - 30);
    date = sevenDaysAgo;
  } else if (payload.data === "yearly") {
    const currentDate = new Date();
    const sevenDaysAgo = new Date(currentDate);
    sevenDaysAgo.setDate(currentDate.getDate() - 365);
    date = sevenDaysAgo;
  }

  let result;
  result = await ProductSale.find();
  if (date) {
    result = await ProductSale.find({
      $and: [{ saleDate: { $gt: date } }],
    }).sort({ saleDate: -1 });
  }
  return result;
};

export const saleServices = {
  createSaleProduct,
  filterByDate,
};
