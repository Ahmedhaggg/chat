import { BelongsToManyAddAssociationMixin, BelongsToManyGetAssociationsMixin, DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import {IGroupAttributes, IGroupCreationAttributes} from '../shared/interfaces/IGroup';
import { GroupStatus } from "../shared/enums/GroupStatus.enum";
import User from "./user.model";
import { GroupPrivacy } from "../shared/enums/GroupPrivacy.enum";
import GroupCategory from "./groupCategory.model";

class Group extends Model<IGroupAttributes, IGroupCreationAttributes> {
    declare id: number;
    declare name: string;
    declare image: string;
    declare adminId: string;
    declare state: GroupStatus;
    declare createdAt: Date;
    declare code: string;
    declare privacy: GroupPrivacy;
    declare categoryId: string;
    public members?: User[];

    // public addUsers!: BelongsToManyAddAssociationMixin<User, number>;
    // public getUsers!: BelongsToManyGetAssociationsMixin<User>;

}

Group.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    adminId: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: "id"
        }
    },
    status: {
        type: DataTypes.ENUM,
        values: [GroupStatus.open, GroupStatus.closed],
        defaultValue: GroupStatus.open
    },
    privacy: {
        type: DataTypes.ENUM,
        values: [GroupPrivacy.private, GroupPrivacy.public]  
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date()
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: GroupCategory,
            key: "id"
        }
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: sequelize,
    tableName: "Group",
    createdAt: false,
    updatedAt: false
});
 
export default Group;