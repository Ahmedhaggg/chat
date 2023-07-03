import  bcrypt from "bcryptjs"
import { BCRYPT_SALT_INT } from "../config/index"
export class Hashing {
    static async hash(data: any) : Promise<string> {
        const salt = await bcrypt.genSalt(BCRYPT_SALT_INT);
    
        let hash = await bcrypt.hash(data, salt);
    
        return hash;
    }
    
    static async compare(data: any, hashedData: string) : Promise<boolean>{
        let isHashed : boolean = await bcrypt.compare(data, hashedData);
    
        return isHashed;
    } 
}