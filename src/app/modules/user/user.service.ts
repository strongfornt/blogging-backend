import { TUser } from "./user.interface"
import { userModel } from "./user.model"

const registerUserIntoDB = async (payload: TUser) => {
    const response = await userModel.create(payload);
    return response
}


export const UserService = {
    registerUserIntoDB
}