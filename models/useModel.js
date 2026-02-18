'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING(191),
        allowNull: false,
        unique: true,
      },

      password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      role: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'user',
      },
    },
    {
      tableName: 'users',
      underscored: true,     // created_at / updated_at
      timestamps: true,      // Sequelize gerencia createdAt/updatedAt
    }
  );

  return User;
};
