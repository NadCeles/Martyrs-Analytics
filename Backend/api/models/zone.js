const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Zone = sequelize.define(
	'zone',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
    },
    {updatedAt: false}
)

module.exports = Zone