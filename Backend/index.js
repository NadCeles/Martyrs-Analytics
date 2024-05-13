require('dotenv').config()
const { checkConnection, syncModels } = require('./database/index')
const addRelationsToModels = require('./database/models')

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

async function checkAndSyncMySQL() {
	await checkConnection()
	addRelationsToModels()
	await syncModels('force')
}

const corsOptions = {
    credentials: true,
    origin: ['http://localhost:5173', 'http://martyrs-the-way-down.com', 'http://api.martyrs-the-way-down.com', /\.martyrs-the-way-down\.com$/], // Whitelist the domains you want to allow
	optionsSuccessStatus: 200
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
