import { Model } from "mongoose";

export interface IUser {
  id?: string;
  name: string;
  username: string;
  email: string;
  password: string;
  isMember?:boolean;
  points?:number;
   role:'Seller'|'Manager'|'Admin'|'User'
}

export type TLoginData = {
  username: string;
  password: string;
};

export interface UserModel extends Model<IUser> {
  isExistUSer(username:string): Promise<IUser|null>;
}