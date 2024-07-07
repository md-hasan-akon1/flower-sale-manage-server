"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saleProductRouter = void 0;
const express_1 = __importDefault(require("express"));
const Productsalle_controller_1 = require("./Productsalle.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const constant_1 = require("../../constant/constant");
exports.saleProductRouter = express_1.default.Router();
exports.saleProductRouter.post("/create-sale", (0, auth_1.default)(constant_1.userRole.Seller, constant_1.userRole.Manager, constant_1.userRole.Admin), Productsalle_controller_1.saleControllers.createSaleProduct);
exports.saleProductRouter.get("/filter-sale", (0, auth_1.default)(constant_1.userRole.Seller, constant_1.userRole.Manager, constant_1.userRole.Admin), Productsalle_controller_1.saleControllers.filterByDate);
