"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Role, {
        through: "UserRole",
        foreignKey: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  User.init(
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: DataTypes.STRING,
      confirmation_password: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      verified: DataTypes.BOOLEAN,
      token: DataTypes.STRING,
      token_expiry: DataTypes.DATE,
      two_factor_secret: DataTypes.STRING,
      two_factor_created_at: DataTypes.DATE,
      two_factor_recovery_code:DataTypes.STRING
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      timestamps: true,
      createdAt: "created_at", // specify the correct field name for createdAt
      updatedAt: "updated_at", // specify the correct field name for updatedAt
    }
  );
  return User;
};
