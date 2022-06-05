const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const port = process.env.PORT || 5001
const { errorHandler } = require("./middleware/errorMiddleware")

// initialize express
const app = express()

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(errorHandler)

// routes
app.use('/api/quotes', require('./routes/quoteRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

// mongoose connect to mongodb & then launch express server
const connectDB = async () => {
  try {
    console.log(`connecting to mongodb..`)
    const conn = await mongoose.connect(process.env.MONGO_ATLAS_URI)
    console.log(`mongo connected`)

    app.listen(port, () => console.log(`Express Server started at port: ${port}`))

  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
connectDB()
