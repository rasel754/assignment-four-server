/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUserRole = keyof typeof USER_ROLE;


export interface TUser {
  name: string;
  email: string;
  password: string;
  role?: TUserRole;
  isBlocked?: boolean;
}


export interface UserModel extends Model<TUser> {

  checkUserExistByEmailId(id: string): Promise<TUser>;
  
  checkLoginPasswordMatch(
    plainTextPassword: string,
    hashPassword: string,
  ): Promise<boolean>;
}
