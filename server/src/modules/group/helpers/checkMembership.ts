import User from "../../../models/user.model"

export const checkMemberShip = (userId: string, groupMembers: User[] | undefined) : boolean => {
    let userInMembers = groupMembers?.find(member  => member.id === userId)
    return userInMembers ? true  : false;
}