const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const User = sequelize.define(
	'user',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		surname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                is: {
                    args: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    msg: "Error: Wrong email format."
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('Admin', 'User'),
            allowNull: false,
        },
        steam_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.ENUM('Non Binary', 'Woman', 'Other', 'Man'),
            allowNull: false
        },
        birthdate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: new Date
		},
    },
    {updatedAt: false}
)

module.exports = User
