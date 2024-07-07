import express from "express";
import { userControllers } from "./user.controller";
import auth from "../../middlewares/auth";
import { userRole } from "../../constant/constant";

const userRouter = express.Router();

userRouter.post("/create-user", userControllers.createUserIntoDB);
userRouter.post("/login", userControllers.userLogin);
userRouter.post("/refresh-token", userControllers.refreshToken);
userRouter.get('/',auth(userRole.Admin,userRole.Manager,userRole.Seller),userControllers.getAllUserWithOutAdmin)
userRouter.get('/user-with-admin',auth(userRole.Admin,userRole.Manager,userRole.Seller),userControllers.getAllUsers)

userRouter.get('/:username',auth(userRole.Admin,userRole.Manager,userRole.Seller ,userRole.User),userControllers.getMe)
userRouter.patch('/updateRole',auth(userRole.Admin,userRole.Manager,userRole.Seller),userControllers.updateRole)
userRouter.patch('/getMember',auth(userRole.Admin,userRole.Manager,userRole.Seller),userControllers.getMemberShip)

export default userRouter;
