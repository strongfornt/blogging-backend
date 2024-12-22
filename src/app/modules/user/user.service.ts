import { TUser } from "./user.interface"
import { UserModel } from "./user.model";


const registerUserIntoDB = async (payload: TUser) => {
    const response = await UserModel.create(payload);
    return response
}





export const UserService = {
    registerUserIntoDB,
}