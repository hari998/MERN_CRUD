const mongoose = require('mongoose')

/* 
pt1 - this will allow us, make user associated with the quote, means which user has written which quotes
pt2 - this will set the mongodb ObjectId as its type
pt3 - this 'ref' means, to which model the ObjectId pertains to
*/

const quoteSchema = mongoose.Schema({
    user: {                                     //pt1
        type: mongoose.Schema.Types.ObjectId,   //pt2
        required: true,
        ref: 'User'                             //pt3
    },
    name: {
        type: String,
        required: [true, 'please add a name']
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