import { User } from "../../../models";
import IUserLogin from "../interfaces/IUserLogin";

export const createUser = async (userData: IUserLogin) : Promise<User> => await User
    .create(userData, { raw: true })

export const findUserByEmail = async (email: string) : Promise<User | null> => await User
    .findOne({ where: { email }, raw: true });
