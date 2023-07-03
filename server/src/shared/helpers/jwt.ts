let jwt = require("jsonwebtoken");
let { JWT_SECRET } = require("../config/index");
import ApiError from "../errors/ApiError";

export const createJwtToken = async (data: any, expire: string) : Promise<string> => {
    try {
        let token = await jwt.sign(data, JWT_SECRET, { expiresIn: expire });
        return token;
    } catch (_) {
        throw new Error("something went wrong")
    }
};
export const getDataFromJwtToken = async (token :string): Promise<any> => {
    try {
        let data = await jwt.verify(token, JWT_SECRET);

        return data;
    } catch (r) {
        throw new ApiError(401, {
            message: "not authorized",
            errorName: "authorization"
        })
    }
}