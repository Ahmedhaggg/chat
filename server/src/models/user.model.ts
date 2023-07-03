import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import IUser from '../shared/interfaces/IUser';
import Country from "./country.model";
import shortid from "shortid"
import Group from "./group.model";

class User extends Model<IUser> {
    declare id : string;
    declare name : string;
    declare photo : string;
    declare email : string;
    declare countryId: string;
    declare code: string;
    public groups?: Group[];
}

User.init({ 
    id: {
        type:  DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    photo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    countryId: {
        type: DataTypes.INTEGER,
        references: {
            model: Country,
            key: 'id'
        }
    },
    code: {
        type: DataTypes.STRING,
        unique: true,
        defaultValue: shortid.generate(),
    }
}, {
    sequelize: sequelize,
    tableName: "User",
    createdAt: false,
    updatedAt: false
});
 
export default User;