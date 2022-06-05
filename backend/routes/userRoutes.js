const express = require('express')
const userRouter = express.Router()
const { registerUser, loginUser, getme } = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware')


userRouter.route('/register').post(registerUser)
userRouter.route('/login').post(loginUser)
userRouter.get('/me', protect, getme)

module.exports = userRouter