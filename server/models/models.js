const {DataTypes} = require('sequelize')
const sequelize = require('../database/database')

const User = sequelize.define('user', {
    id:{type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    email: { type: DataTypes.STRING, unique: true},
    username: { type: DataTypes.STRING, unique: true},
    password: { type: DataTypes.STRING},
    role: { type: DataTypes.STRING, defaultValue: 'user'}
})

module.exports = {
    User,
}