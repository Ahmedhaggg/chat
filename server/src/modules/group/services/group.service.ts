import { Group } from "../../../models";
import ApiError from "../../../shared/errors/ApiError";
import httpStatusCode from "../../../shared/errors/httpStatusCode";
import { IGroupCreationAttributes } from "../../../shared/interfaces/IGroup";
import { removeFile, saveFileFromMemory } from "../../../shared/middlewares/uploader";
import { checkMemberShip } from "../helpers/checkMembership";
import ISearchGroupsQuery from "../interfaces/ISearchGroupsQuery";
import IUpdateGroup from "../interfaces/IUpdateGroup";
import groupRepository from "../repositories/group.repository";

export const findGroupsByQuery = async (query: ISearchGroupsQuery) : Promise<Group[]> => 
    await groupRepository.findGroupsByQuery(query);

export const createGroup = async (newGroupData: IGroupCreationAttributes) : Promise<Group> => 
    await groupRepository.createGroup(newGroupData);

export const findUserGroup = async (userId: string, groupId: number) => {
    let group = await groupRepository.findGroupById(groupId);
    
    if (!group)
        throw new ApiError(httpStatusCode.CLIENT_ERROR, "group is not found");

    if (!checkMemberShip(userId, group?.members))
        throw new ApiError(httpStatusCode.CLIENT_ERROR, "you is not member in this group");
    
    return group;
}

export const updateGroupImage = async (groupId: number, newGroupImageBuffer: Buffer ) : Promise<string> => {
    let groupCurrentData = await groupRepository.findGroupMainAttributesById(groupId);

    if (!groupCurrentData)
        throw new ApiError(httpStatusCode.NOT_FOUND, "group not found to update")
    
    let fileUploadingResult = await saveFileFromMemory(newGroupImageBuffer, groupCurrentData.name);
    
    if (!fileUploadingResult)
        throw new ApiError(httpStatusCode.INTERNAL_SERVER_ERROR, "something went wrong when upload the new group image")

    await groupRepository.updateGroupById(groupId, { image: fileUploadingResult.secure_url })
    await removeFile(groupCurrentData.image);

    return fileUploadingResult.secure_url;
}

export const updateGroupData = async (groupId: number, newGroupData: IUpdateGroup) : Promise<void> => {
    let groupCurrentData = await groupRepository.findGroupMainAttributesById(groupId);

    if (!groupCurrentData)
        throw new ApiError(httpStatusCode.NOT_FOUND, "group not found to update")
    
    let updateGroupResult = await groupRepository.updateGroupById(groupId, newGroupData);

    if (updateGroupResult === false)
        throw new ApiError(httpStatusCode.INTERNAL_SERVER_ERROR, "something went wrong")
}