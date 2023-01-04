import {Router} from "express";
import DetailController from "../controller/detail-controller";

export const detailRouter = Router()
detailRouter.post("/create/:id",DetailController.creatDetail);
detailRouter.get("/show/:id",DetailController.showDetail);
detailRouter.delete("/delete/:id",DetailController.deleteDetail);
