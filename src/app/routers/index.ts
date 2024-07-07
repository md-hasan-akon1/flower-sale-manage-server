import express from "express";
import userRouter from "../modules/users/user.router";
import { productRouter } from "../modules/product/product.route";
import { saleProductRouter } from "../modules/Productsalle/Productsalle.routes";
import { couponRouter } from "../modules/couponCode/couponCode.route";

const router = express.Router();
const RouterModules = [
  {
    path: "/user",
    element: userRouter,
  },
  {
    path: "/product",
    element: productRouter,
  },
  {
    path: "/coupon",
    element: couponRouter,
  },
  {
    path: "/sale",
    element: saleProductRouter,
  },
];
RouterModules.forEach((route) => {
  router.use(route.path, route.element);
});

export default router;
