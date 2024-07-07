import express from "express";
import { productControllers } from "./product.controllers";
import auth from "../../middlewares/auth";
import { userRole } from "../../constant/constant";

export const productRouter = express.Router();
productRouter.post(
  "/create-product",
  auth(userRole.Manager,userRole.Admin),
  productControllers.createProductIntoDB
);
productRouter.get(
  "/getall-product",
  auth(userRole.Manager, userRole.Seller,userRole.Admin),
  productControllers.getAllProductIntoDB
);
productRouter.delete(
  "/delete-product",
  auth(userRole.Manager,userRole.Admin),
  productControllers.deleteProductIntoDB
);
productRouter.put(
  "/update-product/:id",
  auth(userRole.Manager,userRole.Admin),
  productControllers.updateProductIntoDB
);
productRouter.get(
  "/get-product/:id",
  auth(userRole.Manager, userRole.Seller,userRole.Admin),
  productControllers.getSingleProductIntoDB
);
