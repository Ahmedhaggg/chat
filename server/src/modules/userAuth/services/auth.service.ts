import IUser from "../../../shared/interfaces/IUser";
import IUserLogin from "../interfaces/IUserLogin";
import { createRefreshToken } from "../repositories/token.repository";
import { createUser, findUserByEmail } from "../repositories/user.repositories";
import { generateUserAccessToken, generateUserRefreshToken } from "../utils/userTokenGenerator";

export const loginWithGoogle = async (userData: IUserLogin) : Promise<{ accessToken: string, refreshToken: string}> => {
    let { email, name, photo } = userData;

    let user = await findUserByEmail(email);
    
    if (!user) 
        user = await createUser({ email, name, photo });
    
    let refreshToken = await generateUserRefreshToken(user.id);
    let accessToken = await generateUserAccessToken(user.id);

    await createRefreshToken({ userId: user.id, token: refreshToken });

    return { refreshToken, accessToken };
}