const mongoose = require('mongoose')

const quoteSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please add your name']
        // error status 500 is sent if validation error from mongoose
    },
    quote: {
        type: String,
        required: [true, 'please add a quote']
    }
},
    {
        timestamps: true,
    }

)

module.exports = mongoose.model('Quotes', quoteSchema)