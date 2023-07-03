import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { IFriendChat } from "../shared/interfaces/IFriendChat";
import User from "./user.model";

class FriendChat extends Model<IFriendChat> {
    declare id: number;
    declare name: string;
}

FriendChat.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user1: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    },
    user2: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    },
}, {
    sequelize: sequelize,
    tableName: "FriendChat",
    createdAt: false,
    updatedAt: false
});
 
export default FriendChat;