const Router = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const adminController = require('../controllers/adminController')
const router = Router()

router.get('/dashboard', authMiddleware.verifyToken, authMiddleware.authorizeAdmin,adminController.dashboard,)


module.exports = router