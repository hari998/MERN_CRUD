const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userSchema')

//  since this middleware is for protecting a route
//  during the login/register process, we already signed a jwt token and sent to the client . it means client has a token (with an expiry time) with them. 
// so now when we recevie a request, we ( this middleware) will check/look for the token in http header
// during req res cycle this mddleware function is to check the token 
// --
// the way token will be sent is in the http header
// in http header we have a authorisation object


/*
 pt1- get token from header  ,, split() will  turn the token into array & [1] will give just the token

 pt2- // (because token has _id as payload... we have signed _id in the token payload during jwt generation, by 
      // _id we can identify the user)
      // '-password' -> to ignore the hashpassword
*/


const protect = asyncHandler(async (req, res, next) => {
  // initialize token
  let token

  // check req headers- if token is in headers AND if it starts with BEARER
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header , pt1
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token , pt2
      req.user = await User.findById(decoded.id).select('-password')

      next()

    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

module.exports = { protect }