require('dotenv').config()
const { checkConnection, syncModels } = require('./database/index')
const addRelationsToModels = require('./database/models')

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

async function checkAndSyncMySQL() {
	await checkConnection()
	addRelationsToModels()
	await syncModels('alter')
}

const corsOptions = {
    credentials: true,
    origin: ['http://localhost:5173', 'http://localhost:8000'] // Whitelist the domains you want to allow
};

function initializeAndListenWithExpress() {
	const app = express()
		.use(cors(corsOptions))
		.use(morgan('dev'))
		.use(express.json())
		.use('/api', require('./api/routes'))

		.listen(process.env.PORT, () => {
			console.log(`> Listening on port: ${process.env.PORT}`)
		})
}

async function startAPI() {
	await checkAndSyncMySQL()
	initializeAndListenWithExpress()
}

startAPI()
