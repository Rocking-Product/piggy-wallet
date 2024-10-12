import { Model, DataTypes } from 'sequelize';
import dbSequelize from '../config/database.mjs';
import User from './User.mjs';

class Child extends Model {}

Child.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    privyAddress: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: dbSequelize,
    modelName: 'Child',
    tableName: 'children',
    timestamps: true,
  }
);

// Relación entre User y Child
Child.associate = function(models) {
  Child.belongsTo(models.User, {
    foreignKey: 'parentId',
    as: 'Parent'
  });
};

export default Child;
