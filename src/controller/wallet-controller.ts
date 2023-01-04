import {Request, Response} from "express";
import WalletService from "../service/wallet-service";

class WalletController {
    showWallet = async (req: Request, res: Response) => {
        return await WalletService.getAllWallet(req, res)
    }
    createWallet = async (req: Request, res: Response) => {
        return await WalletService.addWallet(req, res)
    }
    deleteWallet = async (req: Request, res: Response) => {
        return await WalletService.deleteWallet(req, res)
    }
    uploadWallet = async (req: Request, res: Response) => {
        return await WalletService.editWallet(req, res)
    }
    findWalletByName = async (req: Request, res: Response) => {
        return await WalletService.findWalletByName(req, res)
    }
    showWalletById = async (req: Request, res: Response) => {
        return await WalletService.showWalletById(req, res)
    }
}

export default new WalletController()