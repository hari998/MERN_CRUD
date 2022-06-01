const express = require('express')
const userRouter = express.Router()
const { registerUser, loginUser, getme } = require('../controllers/userController')


userRouter.route('/register').post(registerUser)
userRouter.route('/login').post(loginUser)
userRouter.get('/me', getme)

module.exports = userRouter