import {Router} from "express";
import UserController from "../controller/user-controller";
import {auth} from "../middleware/auth";

export const userRouter = Router();
userRouter.post('/login',UserController.loginUser);
userRouter.post('/register',UserController.register);
userRouter.use(auth);
userRouter.put('/editUser/:id',UserController.uploadAccount);
userRouter.put('/editPassword/:id',UserController.uploadPassword);
userRouter.get('/infoUser/:id',UserController.getInfo);





