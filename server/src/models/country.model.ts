import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import ICountry from "../shared/interfaces/ICountry";

class Country extends Model<ICountry> {
    declare id: number;
    declare name: string;
}

Country.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    flag: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: sequelize,
    tableName: "Country",
    createdAt: false,
    updatedAt: false
});
 
export default Country;