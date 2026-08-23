const Router = require('express')
const userController = require('../controllers/userController')
const router = Router()

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/check-cookie', userController.checkCookie)
router.post('/logout', userController.logout)
router.get('/profile', userController.profile)


module.exports = router