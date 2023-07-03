import { Request } from "express";
import { GroupStatus } from "../../../shared/enums/GroupStatus.enum";
import { GroupPrivacy } from "../../../shared/enums/GroupPrivacy.enum";

export default interface ICreateGroup {
    adminId: string;
    name: string,
    categoryId: number,
    status: GroupStatus,
    privacy: GroupPrivacy;
    image: string;
}