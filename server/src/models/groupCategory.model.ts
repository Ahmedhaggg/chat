import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import IGroupCategort from "../shared/interfaces/IGroupCategory";

class GroupCategory extends Model<IGroupCategort> {
    declare id: number;
    declare name: string;
}

GroupCategory.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    } 
}, {
    sequelize: sequelize,
    tableName: "GroupCategory",
    createdAt: false,
    updatedAt: false
});
 
export default GroupCategory;