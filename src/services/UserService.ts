import { IUserService } from "./interfaces/IUserService";
import User from "../model/User";
import { ItemNotFound } from "../exceptions/ItemNotFound";

export class UserService implements IUserService {

    async createUser(name: string): Promise<User> {
        const user = new User({ name });
        await user.save();
        return user;
    }
    async getUser(userId: number): Promise<User> {
        const result = await User.findByPk(userId);
        if (result == null)
            throw new ItemNotFound();

        return result;
    }

    async getUserList(): Promise<Array<User>> {
        return await User.findAll();
    }
}