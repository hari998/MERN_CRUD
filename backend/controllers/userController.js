const asyncHandler = require('express-async-handler')
const User = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// register new user
// @route post /api/users/register
// first check if user already exists ? then create the user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    // validate
    if (!name || !email || !password) {
        res.status(401)
        throw new Error('please enter all fields')
    }

    // check if user exist
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('user already registered')
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)


    // create user
    const createUser = await User.create({ name, email, password: hashPassword })

    if (createUser) {
        res.status(201).json({
            _id: createUser.id,
            name: createUser.name,
            email: createUser.email,
            token: generateToken(createUser._id)
        })
    }
})


// login user
// @route post /api/users/login
// first check if user exits? by finding the email,,, then match the email and password (plain password by hashpassword that is stored in the database by using bcrypt.compare())
//  the password we are receiving in req.body for login is not going to be hashed, which i thnk is a security concern as of now
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // validate
    if (!email || !password) {
        res.status(401)
        throw new Error('please enter all fields')
    }

    // check for user email
    const user = await User.findOne({ email })

    // check for
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('invalid login details')
    }
})


// GET user data
// @Route  GET  api/users/getme
// private ---- protect this route using authMiddleware
const getme = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})


// generate jwt token - take in id because that is what i want to put in as payload in jwt token ....  this payload will be unique to each user hence, it will be used to authenticate users
// jwt.sign() -> this will sign a new token with the id and secret
//  ** in jwt , basically on successfull register or login , we are attaching a jwt tokn in the response http header.. which is acting as authentication here.
//  we need to now protect a url for avoiding unauthorised access,, so see authMiddleware.js file now for more info..
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' })
}


module.exports = { registerUser, loginUser, getme }