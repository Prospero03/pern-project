const Router = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const adminController = require('../controllers/adminController')
const router = Router()

router.get('/', authMiddleware.verifyToken, authMiddleware.authorizeAdmin,adminController.dashboard,)


module.exports = router