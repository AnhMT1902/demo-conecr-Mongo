import {Request, Response} from "express";
import {Spending} from "../model/spending";
import DetailService from "./detail-service";
import {User} from "../model/user";

class SpendingService {
    findAll = async (req: Request, res: Response) => {
        let spending = await Spending.find();
        return res.status(200).json(spending)
    }

    addSpending = async (req: Request, res: Response) => {
        let spending = req.body
        spending = await Spending.create(spending);
        return res.status(201).json({
            message: "Success"
        })
    }


    deleteSpending = async (req: Request, res: Response) => {
        let id = req.params.id
        let spending = await DetailService.findByIdSpending(req, res, id)
        if (!spending) {
            return res.status(200).json({
                message: "spending da dc sd, ko the xoa"
            });
        } else {
            await Spending.deleteOne({_id: id})
            return res.status(200).json({
                message: "spending da dc xoa"
            });
        }
    }
    findByIdSpending = async (req: Request, res: Response) => {
        let arrDetail = await Spending.find().populate("Detail", "idSpending");
        console.log(arrDetail)
        return res.status(201).json(arrDetail)
    }
    editSpending = async (req: Request, res: Response) => {
        let spending = req.body;
        let id = req.params.id;
        await User.updateOne({_id: id}, {$set: spending})
        return res.status(201).json({
            message: "Edit Success!!!"
        })
    }
}

export default new SpendingService()