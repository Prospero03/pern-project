require('dotenv').config()
const express = require('express')
const cors = require('cors')

const sequelize = require('./database/database')
const models = require('./models/models')

const PORT = process.env.PORT || 8000
const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))
app.use(express.json())

const start = async() => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({alter: true})
        app.listen(PORT, ()=> console.log(`сервер запущен на порту ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()
