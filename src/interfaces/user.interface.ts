import { User_Role, User_Status } from './../constants/user.constant';
import { Document } from 'mongoose';
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  serverId?: string;
  role?: keyof typeof User_Role;
  status?: keyof typeof User_Status;
  companyName: string;
  phone: string;
  lastLogin?: Date;
}
