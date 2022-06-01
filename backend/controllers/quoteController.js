const asyncHandler = require('express-async-handler')
const Quotes = require("../models/quoteschema")

// GET all quotes from database
// @Route  GET  api/quotes/
const getQuote = async (req, res) => {
    try {
        const quotes = await Quotes.find()
        res.status(200).json(quotes)
    } catch (error) { console.log(error) }
}

// POST the quote to database
// @Route POST  api/quotes/
const SetQuote = asyncHandler(async (req, res) => {
    if (!req.body.name || !req.body.quote) {
        res.status(400)
        throw new Error('Please enter all records')
    }
    const quotes = await Quotes.create({
        name: req.body.name,
        quote: req.body.quote
    })
    res.status(200).json(quotes);
})

// PUT update the quote in database by using /:id in the url
// @Route  PUT  api/quotes/:id
const updateQuote = asyncHandler(async (req, res) => {
    const updateQuote = await Quotes.findById(req.params.id)

    if (!updateQuote) {
        res.status(400)
        throw new Error('Quote not found')
    }
    const updatedQuote = await Quotes.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updatedQuote)
})

// DELETE the quote in database by using /:id in the url
// @Route  DELETE  api/quotes/:id
const deleteQuote = async (req, res) => {
    try {
        const deleteQuote = await Quotes.deleteOne({_id: req.params.id})
        res.json(deleteQuote)
    } catch (error) { console.log(error) }
    
}

module.exports = { getQuote, SetQuote, updateQuote, deleteQuote }

