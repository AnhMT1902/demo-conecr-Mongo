import {Request, Response} from "express";
import {Detail} from "../model/detail";
import {Spending} from "../model/spending";
import WalletService from "./wallet-service";
import {Wallet} from "../model/wallet";

class DetailService {
    getAll = async (req: Request, res: Response) => {
        let idWallet = req.params.id
        let walletDetail = await Detail.find({idWallet: idWallet})
        res.status(200).json(walletDetail)
    }
    creatDetail = async (req: Request, res: Response) => {
        let idWallet = req.params.id
        let detail = req.body
        detail.idWallet = idWallet;
        await Detail.create(detail);
        // let money = +await WalletService.calSurplus(req, res, idWallet)
        // await Wallet.updateOne({_id: idWallet}, {$set: {money: money}});
        return res.status(200).json(detail);
    }

    deleteDetail = async (req: Request, res: Response) => {
        let idDetail = req.params.id
        let detail = await Detail.find({_id: idDetail}, {idWallet: 1});
        let idWallet = String(detail[0].idWallet)
        let arrDetail = await Detail.deleteOne(detail)
        // let money = +await WalletService.calSurplus(req, res, idWallet)
        // await Wallet.updateOne({_id: idWallet}, {$set: {money: money}});
        return res.status(200).json({
            message: 'success'
        })
    }


    findByIdSpending = async (req: Request, res: Response, idS) => {
        let arrDetail = await Spending.find({idSpending: idS})
        if (arrDetail.length === 0) {
            return false
        } else {
            return true
        }
    }
}

export default new DetailService()