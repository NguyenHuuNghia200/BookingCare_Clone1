'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('markdown', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },


            contentHtml: {
                type: Sequelize.TEXT('long')
            },
            contentMarkdown: {
                type: Sequelize.TEXT('long')
            },
            DoctorId: {
                type: Sequelize.INTEGER
            },
            description: {
                type: Sequelize.TEXT('long')
            },
            specialtyId: {
                type: Sequelize.INTEGER
            },
            clinicId: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: true,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('markdown');
    }
};