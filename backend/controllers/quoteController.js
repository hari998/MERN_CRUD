const asyncHandler = require('express-async-handler')
const Quotes = require("../models/quoteschema")
const User = require('../models/userSchema')

// GET all quotes from database
// @Route  GET  api/quotes/
const getQuote = asyncHandler(async (req, res) => {

  const quotes = await Quotes.find({ user: req.user.id })
  res.status(200).json(quotes)
})


// POST the quote to database
// @Route POST  api/quotes/
const setQuote = asyncHandler(async (req, res) => {

  if (!req.body.quote) {
    res.status(400)
    throw new Error('Please add quote')
  }

  const quotes = await Quotes.create({
    quote: req.body.quote,
    name: req.body.name,
    user: req.user.id,
  })

  res.status(200).json(quotes)
})


// PUT update the quote in database
// @Route  PUT  api/quotes/:id
const updateQuote = asyncHandler(async (req, res) => {
  const updateQuote = await Quotes.findById(req.params.id)

  if (!updateQuote) {
    res.status(400)
    throw new Error('Quote not found')
  }

  if (!req.user) {
    res.status(401)
    throw new Error('user not found')
  }
  //  to check if logged in user matches with quote user
  //  updateQuote.user -> UpdateQuote has a user field 
  // here, basically we are checking (matching) the user's id in the updateQuote  to the  user's id of the user that is logged in (i.e req.user.id),  **this is done in order to avoid one user updating/deleting someone else's quote)

  if (updateQuote.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('user not authorised')
  }
  const updatedQuote = await Quotes.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(updatedQuote)
})


// DELETE the quote in database 
// @Route  DELETE  api/quotes/:id
const deleteQuote = asyncHandler(async (req, res) => {

  const deleteQuote = await Quotes.findById(req.params.id)

  if (!deleteQuote) {
    res.status(400)
    throw new Error('Quote not found')
  }

  if (!req.user) {
    res.status(401)
    throw new Error('user not found')
  }

  if (deleteQuote.user.toString() != req.user.id) {
    res.status(401)
    throw new Error('user not authorised')
  }

  const deletedQuote = await Quotes.deleteOne({ _id: req.params.id })
  res.status(200).json({ id: req.params.id })

})


module.exports = { getQuote, setQuote, updateQuote, deleteQuote }
