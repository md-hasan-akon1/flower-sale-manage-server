import express, { json } from "express";
import cors from "cors";
import router from "./app/routers";
import cookieParser from'cookie-parser'
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";
const app = express();
export const port = 5000;
app.use(json());
app.use(cookieParser());
app.use(cors({origin:'https://flower-management-eight.vercel.app',credentials:true}));
app.use("/", router);


app.use("/", (req, res) => {
  res.send("Hello World!");
});  

app.use(globalErrorHandler);

app.use(notFound);

export default app;
