'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const func = require('./utils/utility-functions')

try {
  require('./helpers/mongo-connection')
} catch (err) {
  console.log(err)
}

// Body parser middleware
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

// Allow Cross origin request
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept")
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT")
  next()
})

// initialize routes
app.use('/products/v1', require('./routes/product-route'))

// Port listening
const PORT = 9000
app.listen(PORT, () => {
  func.printLog(func.logCons.LOG_LEVEL_INFO, `Listening to port ${PORT}`)
})
