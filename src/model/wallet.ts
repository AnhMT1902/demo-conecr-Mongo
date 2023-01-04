import {Schema,model} from "mongoose";
import {IUser} from "./user";

export interface IWallet{
    name?:string,
    money?:number
    idUser?:IUser
}
const WalletSchema = new Schema<IWallet>({
    name:String,
    money:Number,
    idUser:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }

});
const Wallet=model<IWallet>('Wallet',WalletSchema);
export {Wallet};