import { createJwtToken } from "../../../shared/helpers/jwt";

export const generateUserAccessToken = async (id: string) : Promise<string> => 
    await createJwtToken({ id, role: "user"}, "3d")

export const generateUserRefreshToken = async (id: string) : Promise<string> => 
    await createJwtToken({ id, role: "user"}, "1y")