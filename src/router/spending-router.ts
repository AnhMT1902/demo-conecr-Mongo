import {Router} from "express";
import spendingController from "../controller/spending-controller";

export const spendingRouter = Router();

spendingRouter.get('',spendingController.getAll);
spendingRouter.post('/create',spendingController.addSpending);
spendingRouter.delete('/delete/:id',spendingController.deleteSpending);
spendingRouter.get('/edit/:id',spendingController.editSpending);