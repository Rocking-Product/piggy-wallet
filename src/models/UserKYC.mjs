import { Model, DataTypes } from 'sequelize';
import dbSequelize from '../config/database.mjs';
import User from './User.mjs';

class UserKYC extends Model {}

UserKYC.init(
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
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    documentType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    documentNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    documentImageUrl: {
      type: DataTypes.STRING, // URL para la imagen del documento de identidad
    },
    selfieImageUrl: {
      type: DataTypes.STRING, // URL para la selfie del usuario
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending', // Estado de la verificación KYC (pendiente, aprobado, rechazado)
    },
  },
  {
    sequelize: dbSequelize,
    modelName: 'UserKYC',
    tableName: 'user_kyc',
    timestamps: true,
  }
);

UserKYC.associate = function(models) {
  UserKYC.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'UserKYC'
  });
};

export default UserKYC;