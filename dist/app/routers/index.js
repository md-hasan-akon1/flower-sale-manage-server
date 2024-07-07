"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = __importDefault(require("../modules/users/user.router"));
const product_route_1 = require("../modules/product/product.route");
const Productsalle_routes_1 = require("../modules/Productsalle/Productsalle.routes");
const couponCode_route_1 = require("../modules/couponCode/couponCode.route");
const router = express_1.default.Router();
const RouterModules = [
    {
        path: "/user",
        element: user_router_1.default,
    },
    {
        path: "/product",
        element: product_route_1.productRouter,
    },
    {
        path: "/coupon",
        element: couponCode_route_1.couponRouter,
    },
    {
        path: "/sale",
        element: Productsalle_routes_1.saleProductRouter,
    },
];
RouterModules.forEach((route) => {
    router.use(route.path, route.element);
});
exports.default = router;
