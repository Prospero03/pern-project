const {User} = require('../models/models')
const {Op} = require('sequelize')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class userController{
    async register(req,res){
        try {
            const {username, email, password} = req.body
            if(!username || !email || !password){
                return res.status(400).json({success: false, error:'введите все данные'})
            }
            const existingUser = await User.findOne({
                where:{
                    [Op.or]:[{username}, {email}]
                }
            })
            if(existingUser){
                return res.status(400).json({success: false, error:'пользователь уже существует'})
            }
            const userFormat = /^[A-Za-z\d]+$/
            if(!userFormat.test(username)){
                return res.status(400).json({success: false, error:'только латинские буквы и цифры'})
            }

            const letters = username.match(/[A-Za-z]/g)
            if(letters.length < 4){
                return res.status(400).json({success: false, error:'логин не меньше 4'})
            }

            const hashPassword = await bcrypt.hash(password, 10)
            const newUser = new User({username, email, password:hashPassword})
            await newUser.save()
            return res.status(200).json({success: true, message:'вы зарегистровались'})
        } catch (error) {
            return res.status(500).json({success: false, error:'ошибка сервера'})
        }

    }

    async login(req,res){
        try {
            const {username,  password} = req.body
            if(!username || !password){
                return res.status(400).json({success: false, error:'введите все данные'})
            }
            const existingUser = await User.findOne({
                where:{username},
            })
            if(!existingUser){
                return res.status(400).json({success: false, error:'неверный логин'})
            }
            const comparePassword = await bcrypt.compare(password, existingUser.password)
            if(!comparePassword){
                return res.status(400).json({success: false, error:'неверный пароль'})
            }

            const token = jwt.sign(
                {id: existingUser.id, username: existingUser.username},
                process.env.JWT_SECRET,
                {expiresIn: '30d'}
            )

            res.cookie('ApiReact', token,{
                secure: true,
                httpOnly: true,
                sameSite: "None",
                maxAge: 30 * 24 * 60 * 60 * 1000
            })
            return res.status(200).json({success: true, message:'вы вошли',role: existingUser.role})

        } catch (error) {
            return res.status(500).json({success: false, error:'ошибка сервера'})
        }
    }

    async checkCookie(req,res){
        try {
            const token = req.cookies.ApiReact
            if(token){
                return res.status(200).json({message: true})
            }
            return res.status(200).json({message: false})
        } catch (error) {
            return res.status(500).json({message: false})
        }
    }

    async logout(req,res){
        res.clearCookie('ApiReact',{
            secure: true,
            httpOnly: true,
            sameSite: "None",
            path: '/'
        })
        return res.json({success: true, message:'вы вышли',})
    }

    async profile(req,res){
        try {
            const {user} = req
            return res.status(200).json({success: true, data:{
                username : user.username, 
                email : user.email,
                role : user.role
            }})
        } catch (error) {
            return res.status(500).json({message: false})
        }
    }
}

module.exports = new userController()