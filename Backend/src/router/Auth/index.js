import { Router } from "express";
import authController from "../../controller/Auth/index.js"; 
import userValidator from "../../validator/user/index.js";

const authRouter = Router();

authRouter.post("/SignUp", userValidator.create, authController.SignUp);
authRouter.post("/SignIn", authController.SignIn);
authRouter.post("/google", authController.GoogleSignIn);
authRouter.post("/signout", authController.signOut);

export default authRouter;
