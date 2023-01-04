import {Router} from "express";
import {userRouter} from "./user-router";
import {walletRouter} from "./wallet-router";
import {spendingRouter} from "./spending-router";
import {detailRouter} from "./detail-router";
export const router = Router();
router.use('/user',userRouter);
router.use('/wallet',walletRouter);
router.use('/spending',spendingRouter);
router.use('/detail',detailRouter);

