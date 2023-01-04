import {Request, Response} from "express";
import {Wallet} from "../model/wallet";
import {Detail} from "../model/detail";
import {Spending} from "../model/spending";

class WalletService {
    getAllWallet = async (req: Request, res: Response) => {
        let idUser = req.params.id
        let wallet = await Wallet.find({idUser: idUser})
        res.status(200).json(wallet)
    }

    addWallet = async (req: Request, res: Response) => {
        let wallet = req.body;
        let check = await this.checkNameWallet(wallet)
        console.log(check)
        if (check) {
            await Wallet.create(wallet);
            return res.status(201).json({
                message: "Create Wallet Success!!!",
                check: true
            })
        } else {
            return res.status(201).json({
                message: "Error!!!",
                check: false
            })
        }
    }

    deleteWallet = async (req: Request, res: Response) => {
        let id = req.params.id
        await Wallet.deleteOne({_id: id})
        await Detail.deleteMany({idWallet: id})
        return res.status(201).json({
            message: "Delete Success"
        })
    }

    editWallet = async (req: Request, res: Response) => {
        let id = req.params.id
        let newWallet = req.body
        await Wallet.updateOne({_id: id}, {$set: newWallet})
        return res.status(201).json({
            message: "Edit Success"
        })
    }

    findWalletByName = async (req: Request, res: Response) => {
        let walletName = req.body.name
        let arrWallet = await Wallet.find({'name': {'$regex': walletName}})
        return res.status(201).json(arrWallet)
    }

    checkNameWallet = async (wallet) => {
        let wallets = await Wallet.find({idUser: wallet.idUser, name: wallet.name})
        console.log(wallets)
        if (wallets.length === 0) {
            return true
        } else
            return false
    }

    showWalletById = async (req: Request, res: Response) => {
        let idWallet = req.params.id
        let wallet = await Wallet.findOne({_id: idWallet})
        return res.status(201).json(wallet)
    }

    calSurplus = async (req: Request, res: Response, idWallet) => {
        let revenue: number = 0
        let spend: number = 0
        let arrDetail = await Detail.find({idWallet: idWallet}).populate('Spending', "classify")
        arrDetail.forEach((item) => {
            if (item.Spending.classify === true) {
                revenue += item.money
            } else {
                spend += item.money
            }
        })
        return revenue - spend
    }
}

export default new WalletService();