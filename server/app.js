require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const sequelize = require('./database/database')
const models = require('./models/models')
const router  = require('./routers')


const PORT = process.env.PORT || 8000
const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))
app.use(express.json())
app.use('/api', router)
app.use(cookieParser())

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
