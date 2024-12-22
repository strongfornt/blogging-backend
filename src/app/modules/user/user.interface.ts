
// export interface TUserName {
//     firstName: string;
//     middleName: string;
//     lastName: string;
// }

export interface TUser {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
    isBlocked: boolean
}