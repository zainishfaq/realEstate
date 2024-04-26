
import { Router } from "express";
import userController from "../../controller/user/index.js";

const userRouter = Router();

userRouter.put('/update/:userId', userController.update);
userRouter.delete('/delete/:userId', userController.deleteAccount)


export default userRouter;
