if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const cors = require('cors')
const ownerRoutes = require('./router/owner')
const errorHandler = require('./middlewares/errorHandler')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.status(200).json({
    msg: "Home Page"
  })
})

app.use('/owner', ownerRoutes)

app.use(errorHandler)

module.exports = app
