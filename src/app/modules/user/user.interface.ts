
// export interface TUserName {
//     firstName: string;
//     middleName: string;
//     lastName: string;
// }

import { Model } from "mongoose";

export interface TUser {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
    isBlocked: boolean
}

export interface UserModelInterFace extends Model<TUser> {
    isUserExistsByEmail(email: string) :Promise<TUser>
    isPasswordMatched(plainTextPass: string, hashTextPass: string) : Promise<boolean>
}