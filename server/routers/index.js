const Router = require('express')
const router = Router()
const userRoute  = require('./userRoute')
const adminRoute  = require('./adminRoute')

router.use('/user', userRoute)
router.use('/admin', adminRoute)

module.exports = router