'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tasksWeeks', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      dom: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      seg: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
      },
      ter: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
      },
      qua: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
      },
      qui: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
      },
      sex: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
      },
      sab: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
      },
      dom: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
      },
      tasks_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'tasks', key: 'id' }
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
    return queryInterface.dropTable('tasksWeeks');
  }
};
