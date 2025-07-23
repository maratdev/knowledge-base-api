'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const tableName = 'users';

    const tableExists = await queryInterface.sequelize.query(
        `SELECT to_regclass('public.${tableName}') as exists;`
    );

    if (!tableExists[0][0].exists) {
      await queryInterface.createTable(tableName, {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false
        },
        passwordHash: {
          type: Sequelize.STRING,
          allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      });
    }
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
  }
};
