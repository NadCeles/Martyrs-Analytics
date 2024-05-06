const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Character = sequelize.define(
	'character',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		steam_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: new Date
		},
    },
    {updatedAt: false}
)

module.exports = Character
