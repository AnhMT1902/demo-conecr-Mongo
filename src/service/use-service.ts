import {Request, Response} from "express";
import {User} from "../model/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {SECRET} from "../middleware/auth";

class AccountService {
    addAccount = async (req: Request, res: Response) => {

        let user = req.body;
        user.password = await bcrypt.hash(user.password, 10);
        let userFind = await User.findOne({
            username: user.username
        });
        if (userFind) {
            return res.status(201).json({
                message: "Account da ton tai!!!",
                check: false
            })
        } else {
            user = await User.create(user);
            return res.status(201).json({
                message: "Success",
                check: true,
            })
        }
    }
    loginAccount = async (req: Request, res: Response) => {
        let user = req.body;
        let userFind = await User.findOne({
            username: user.username
        });
        if (!userFind) {
            return res.status(201).json({
                message: "Error User or Password!!!"
            })
        } else {
            let comparePassword = await bcrypt.compare(user.password, userFind.password);
            if (!comparePassword) {
                return res.status(201).json({
                    message: "Error User or Password!!!"
                })
            } else {
                let payload = {
                    idUser: userFind._id,
                    username: userFind.username
                }

                let token = await jwt.sign(payload, SECRET, {
                    expiresIn: 36000
                })
                return res.status(200).json({
                    token: token,
                    message: "Success!!!",
                    idUser: userFind._id
                })
            }
        }
    }
    editAccount = async (req: Request, res: Response) => {
        let info = req.body;
        let id = req.params.id;
        await User.updateMany({_id: id}, {$set: info})
        return res.status(201).json({
            message: "Edit Success!!!"
        })
    }
    editPassword = async (req: Request, res: Response) => {
        let idUser = req.params.id;
        let userFind = await User.findOne({
            _id: idUser
        })
        let oldPassword = req.body.oldPassword;
        let compare = await bcrypt.compare(oldPassword, userFind.password);
        if (!compare) {
            return res.status(200).json({
                message: "Password cu khong chinh xac",
                ck: false
            })
        } else {
            let newPassword = req.body.newPassword;
            newPassword = await bcrypt.hash(newPassword, 10);
            await User.updateOne({_id: idUser}, {$set: {password: newPassword}});
            return res.status(201).json({
                message: "Upload Password Success!!!",
                ck: true
            })
        }
    }

    getInfoUser = async (req: Request, res: Response) => {
        let id = req.params.id
        let infoUser = await User.findById({_id: id});
        return res.status(200).json(infoUser);
    }
}

export default new AccountService();