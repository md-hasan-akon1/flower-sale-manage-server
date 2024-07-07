import  express  from "express"
import { saleControllers } from "./Productsalle.controller"
import auth from "../../middlewares/auth"
import { userRole } from "../../constant/constant"

export const saleProductRouter=express.Router()

saleProductRouter.post("/create-sale", auth(userRole.Seller,userRole.Manager,userRole.Admin),saleControllers.createSaleProduct)
saleProductRouter.get("/filter-sale", auth(userRole.Seller,userRole.Manager,userRole.Admin),saleControllers.filterByDate)