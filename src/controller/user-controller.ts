import {Request, Response} from "express";
import AccountService from "../service/use-service";

class UserController {
    register = async (req: Request, res: Response) => {
        return await AccountService.addAccount(req, res)
    }
    loginUser = async (req: Request, res: Response) => {
        return await AccountService.loginAccount(req, res)
    }
    uploadAccount = async (req: Request, res: Response) => {
        return await AccountService.editAccount(req, res)
    }
    uploadPassword = async (req: Request, res: Response) => {
        return await AccountService.editPassword(req, res)
    }
    getInfo = async (req: Request, res: Response) => {
        return await AccountService.getInfoUser(req, res)
    }
}

export default new UserController();