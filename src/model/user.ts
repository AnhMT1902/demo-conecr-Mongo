import {Schema,model} from "mongoose";
export interface IUser{
    name?:string,
    birthday?:string,
    address?:string,
    phone?:string,
    username?:string,
    password?:string
}
const UserSchema = new Schema<IUser>({
    name:String,
    birthday:String,
    address:String,
    phone:String,
    username:String,
    password:String
});
const User=model<IUser>('User',UserSchema);
export {User};