const asyncHandler = require('express-async-handler')
const User = require('../models/userSchema')

// register new user
// @route post /api/users/register
// first check if user already exists ? then create the user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    // validate
    if(!name || !email || !password) {
        res.status(401)
        throw new Error('please enter all fields')
    }

    // check if user exist
    const userExists = await User.findOne({email})
    if(userExists) {
        res.status(400)
        throw new Error('user already registered')
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)


    // create user
    const createUser = await User.create({ name, email, hashPassword })

    if(createUser){
        res.status(200).json({
            _id: createUser.id,
            name: createUser.name,
            email: createUser.email
            
        })
    }
})

const loginUser = asyncHandler(async (req, res) => {

})

const getme = asyncHandler(async (req, res) => {

})


module.exports = { registerUser, loginUser, getme }