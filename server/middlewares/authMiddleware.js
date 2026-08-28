const {User} = require('../models/models')
const jwt = require('jsonwebtoken')

class authMiddleware{
    async verifyToken(req,res, next){
        const token = req.cookies.ApiReact;
        if(!token){
            return res.status(401).json({error: 'нет авторизации'})
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findByPk(decoded.id)
            req.user = user
            if(!user){
                return res.status(404)
            }
            next()
        } catch (error) {
            return res.status(500)
        }
    }

    authorizeAdmin(req,res,next){
        if(req.user.role !== 'admin'){
            return res.status(403).json({error:'вы не администратор'})
        }
        next()
    }
}

module.exports = new authMiddleware()