const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Chest = sequelize.define(
	'chest',
	{
    },
    {updatedAt: false}
)

module.exports = Chest