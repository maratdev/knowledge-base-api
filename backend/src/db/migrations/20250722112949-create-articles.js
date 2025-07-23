'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const tableName = 'articles';

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
        title: {
          type: Sequelize.STRING,
          allowNull: false
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        tags: {
          type: Sequelize.ARRAY(Sequelize.STRING),
          defaultValue: []
        },
        isPublic: {
          type: Sequelize.BOOLEAN,
          defaultValue: true
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      });
    }
  },

  async down(queryInterface) {
    await queryInterface.dropTable('articles');
  }
};
