import IRefreshToken from "../../../shared/interfaces/IRefreshToken";
import { RefreshToken } from "../../../models";

export const createRefreshToken = async (data: IRefreshToken) : Promise<RefreshToken> => 
    await RefreshToken.create(data);

export const findRefreshToken = async (token: string) : Promise<RefreshToken | null> => 
    await RefreshToken.findOne({ where: { token }});

export const deleteRefreshToken = async (token: string) : Promise<boolean> => {
    let deleteResult = await RefreshToken.destroy({ where: { token }});

    return deleteResult ? true : false;
}