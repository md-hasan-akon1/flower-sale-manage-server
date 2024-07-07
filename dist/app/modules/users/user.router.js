"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const constant_1 = require("../../constant/constant");
const userRouter = express_1.default.Router();
userRouter.post("/create-user", user_controller_1.userControllers.createUserIntoDB);
userRouter.post("/login", user_controller_1.userControllers.userLogin);
userRouter.post("/refresh-token", user_controller_1.userControllers.refreshToken);
userRouter.get('/', (0, auth_1.default)(constant_1.userRole.Admin, constant_1.userRole.Manager, constant_1.userRole.Seller), user_controller_1.userControllers.getAllUserWithOutAdmin);
userRouter.get('/user-with-admin', (0, auth_1.default)(constant_1.userRole.Admin, constant_1.userRole.Manager, constant_1.userRole.Seller), user_controller_1.userControllers.getAllUsers);
userRouter.get('/:username', (0, auth_1.default)(constant_1.userRole.Admin, constant_1.userRole.Manager, constant_1.userRole.Seller, constant_1.userRole.User), user_controller_1.userControllers.getMe);
userRouter.patch('/updateRole', (0, auth_1.default)(constant_1.userRole.Admin, constant_1.userRole.Manager, constant_1.userRole.Seller), user_controller_1.userControllers.updateRole);
userRouter.patch('/getMember', (0, auth_1.default)(constant_1.userRole.Admin, constant_1.userRole.Manager, constant_1.userRole.Seller), user_controller_1.userControllers.getMemberShip);
exports.default = userRouter;
