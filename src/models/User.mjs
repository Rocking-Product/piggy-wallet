import { Model, DataTypes } from 'sequelize';
import dbSequelize from '../config/database.mjs';
import Child from './Child.mjs';
import UserWallet from './UserWallet.mjs';
import UserKYC from './UserKYC.mjs';

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    address: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    }
  },
  {
    sequelize: dbSequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
  }
);

User.hasMany(Child, { foreignKey: 'parentId' });
User.hasMany(UserWallet, { foreignKey: 'userId' });
User.hasOne(UserKYC, { foreignKey: 'userId' });

export default User;
