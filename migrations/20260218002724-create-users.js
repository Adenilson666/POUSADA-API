'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.createTable('users', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      
      email: {
        type: Sequelize.STRING(191),
        allowNull: false,
        unique: true
      },
      
      password_hash: {
        type: Sequelize.STRING(255),
        allowNull: false
      },

      role: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: 'user'
      },
      
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),

        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.dropTable('users');
  }
};
