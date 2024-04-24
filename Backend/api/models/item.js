const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Item = sequelize.define(
	'item',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
        },
    },
    {updatedAt: false}
)

module.exports = Item