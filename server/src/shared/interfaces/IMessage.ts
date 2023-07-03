export default interface IMessage {
    id?: number;
    text?: string;
    image?: string;
    senderId: string;
    friendChatId?: string;
    groupId?: number;
    createAt: string;
}