import { Group, User } from "../../../models";
import ApiError from "../../../shared/errors/ApiError";
import httpStatusCode from "../../../shared/errors/httpStatusCode";
import { IGroupCreationAttributes } from "../../../shared/interfaces/IGroup";
import ISearchGroupsQuery from "../interfaces/ISearchGroupsQuery";
import IUpdateGroup from "../interfaces/IUpdateGroup";

const createGroup = async (groupData: IGroupCreationAttributes) : Promise<Group> => {
    let numberOfUserGroups : number = await Group.count({ where: { adminId: groupData.adminId } });
    if (numberOfUserGroups)
        throw new ApiError(httpStatusCode.CLIENT_ERROR, "you have maximum number of groups equel 5");

    return await Group.create(groupData);
}

const findGroupById = async (id: number) : Promise<Group | null> => 
    await Group.findOne({ 
        where: { id }, 
        include: {
            model: User
        }
    });

const findGroupMainAttributesById = async (id: number) : Promise<Group | null> => 
    await Group.findOne({ where: { id }});

const findGroupsByQuery = async (filterData: ISearchGroupsQuery) : Promise<Group[]> => 
    await Group.findAll({ where: { ...filterData } });

const updateGroupById = async (id: number, newData: IUpdateGroup) : Promise<boolean> => {
    let updateGroupResult = await Group.update(newData, { where: { id }});
    return updateGroupResult[0] ? true : false;
}

export default {
    createGroup, 
    findGroupById,
    findGroupsByQuery,
    updateGroupById,
    findGroupMainAttributesById
}