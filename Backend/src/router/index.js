import { Router } from "express";
import authRouter from "./Auth/index.js";
import userRouter from "./user/index.js";
import listRouter from "./Listing/index.js";

const allRouter = Router();

allRouter.use(authRouter);
allRouter.use(userRouter);
allRouter.use(listRouter);

export default allRouter;
