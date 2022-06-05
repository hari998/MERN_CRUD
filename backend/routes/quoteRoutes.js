const express = require('express')
const quoterouter = express.Router()
const { getQuote, setQuote, updateQuote, deleteQuote } = require('../controllers/quoteController')
const { protect } = require('../middleware/authMiddleware')

quoterouter.route('/').get(protect, getQuote).post(protect, setQuote)
quoterouter.route('/:id').put(protect, updateQuote).delete(protect, deleteQuote)

module.exports = quoterouter