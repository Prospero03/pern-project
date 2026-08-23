const Router = require('express')
const router = Router()
const userRoute  = require('./userRoute')

router.use('/user', userRoute)

module.exports = router