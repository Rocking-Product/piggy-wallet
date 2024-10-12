import { Model, DataTypes } from 'sequelize';
import dbSequelize from '../config/database.mjs';
import User from './User.mjs';

class UserWallet extends Model {}

UserWallet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    walletAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isPrivy: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: dbSequelize,
    modelName: 'UserWallet',
    tableName: 'user_wallets',
    timestamps: true,
  }
);

UserWallet.associate = function(models) {
  UserWallet.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'UserWallet'
  });
};

export default UserWallet;