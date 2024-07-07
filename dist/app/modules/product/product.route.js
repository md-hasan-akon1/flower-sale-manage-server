"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const product_controllers_1 = require("./product.controllers");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const constant_1 = require("../../constant/constant");
exports.productRouter = express_1.default.Router();
exports.productRouter.post("/create-product", (0, auth_1.default)(constant_1.userRole.Manager, constant_1.userRole.Admin), product_controllers_1.productControllers.createProductIntoDB);
exports.productRouter.get("/getall-product", (0, auth_1.default)(constant_1.userRole.Manager, constant_1.userRole.Seller, constant_1.userRole.Admin), product_controllers_1.productControllers.getAllProductIntoDB);
exports.productRouter.delete("/delete-product", (0, auth_1.default)(constant_1.userRole.Manager, constant_1.userRole.Admin), product_controllers_1.productControllers.deleteProductIntoDB);
exports.productRouter.put("/update-product/:id", (0, auth_1.default)(constant_1.userRole.Manager, constant_1.userRole.Admin), product_controllers_1.productControllers.updateProductIntoDB);
exports.productRouter.get("/get-product/:id", (0, auth_1.default)(constant_1.userRole.Manager, constant_1.userRole.Seller, constant_1.userRole.Admin), product_controllers_1.productControllers.getSingleProductIntoDB);
