const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Enemy = sequelize.define(
	'enemy',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		level: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
        },
    },
    {updatedAt: false}
)

module.exports = Enemy
