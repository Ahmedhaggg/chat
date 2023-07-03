import User from "../../models/user.model";
import { GroupPrivacy } from "../enums/GroupPrivacy.enum";
import { GroupStatus } from "../enums/GroupStatus.enum";

export interface IGroupAttributes {
    id?: number;
    name: string;
    image: string;
    adminId: string;
    status: GroupStatus;
    privacy: GroupPrivacy;
    code: string;
    categoryId: number;
    createdAt: Date;
}

export interface IGroupCreationAttributes extends Pick<IGroupAttributes,
    Exclude <keyof IGroupAttributes, "id" | "code" | "createdAt">> {}