const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Milestone= sequelize.define(
	'milestone',
	{
        type: {
            type: DataTypes.ENUM('Zone', 'Boss', 'Unique Item'),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {updatedAt: false}
)

module.exports = Milestone