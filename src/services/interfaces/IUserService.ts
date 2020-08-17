import User from "../../model/User";

export interface IUserService {
    createUser(name: string): Promise<User>;
    getUser(userId: number): Promise<User>;
    getUserList(): Promise<Array<User>>;
}