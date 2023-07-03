import IMessage from "../shared/interfaces/IMessage";
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./user.model";
import Group from "./group.model";
import FriendChat from "./friendChat.model";

class Message extends Model<IMessage> {
    declare id: number;
    declare text: string;
    declare image: string;
    declare groupId: number;
    declare senderId : string;
    declare friendChatId : string;
    declare createdAt: Date;
}

Message.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: DataTypes.STRING,
        allowNull: true
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    senderId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    },
    // sender can send message to friend or group so groupId and to is optional
    groupId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { 
            model: Group,
            key: "id"
        }
    },
    friendChatId: {
        type: DataTypes.NUMBER,
        allowNull: true,
        references: {
            model: FriendChat,
            key: "id"
        }
    },
    createAt: {
        type: DataTypes.DATE,
        defaultValue: new Date()
    }
}, {
    sequelize: sequelize,
    tableName: "Message",
    createdAt: false,
    updatedAt: false
});
 
export default Message;