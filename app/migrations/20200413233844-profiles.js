'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('profiles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pwd: {
          type: Sequelize.STRING,
          allowNull: false
      },
      dateOfBird: {
          type: Sequelize.DATE,
          allowNull: false
      },
      score: {
          type: Sequelize.INTEGER,
          defaultValue: 0
      },
      users_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('profiles');
  }
};
