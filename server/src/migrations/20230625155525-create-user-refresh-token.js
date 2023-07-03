'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('RefreshToken', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "User",
          key: "id"
        }
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("RefreshToken");
  }
};
