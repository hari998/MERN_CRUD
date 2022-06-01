const express = require('express')
const quoterouter = express.Router()
const { getQuote, SetQuote, updateQuote, deleteQuote } = require('../controllers/quoteController')

quoterouter.route('/').get(getQuote).post(SetQuote)
quoterouter.route('/:id').put(updateQuote).delete(deleteQuote)

module.exports = quoterouter