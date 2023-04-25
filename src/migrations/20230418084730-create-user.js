"use strict";

const {v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID,
        unique:true
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
      },
      password: {
        type: Sequelize.STRING,
      },
      confirmation_password: {
        type: Sequelize.STRING,
      },
      active:{
        type:Sequelize.BOOLEAN,
        defaultValue:false,
        allowNull:false
      },
      verified:{
        type:Sequelize.BOOLEAN,
        defaultValue:false,
        allowNull:false
      },
      token:{
        type:Sequelize.STRING,
      },
      token_expiry: {
        type:Sequelize.DATE,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        allowNull: false,
      },
    });
    
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
