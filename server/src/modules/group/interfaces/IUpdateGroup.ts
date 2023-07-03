import { GroupPrivacy } from "../../../shared/enums/GroupPrivacy.enum";
import { GroupStatus } from "../../../shared/enums/GroupStatus.enum";

export default interface IUpdateGroup {
    image?: string;
    name?: string;
    status?: GroupStatus;
    privacy?: GroupPrivacy
}