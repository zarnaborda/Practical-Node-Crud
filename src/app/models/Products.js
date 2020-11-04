'use strict'

const mongoose = require('mongoose')

// Create Student Schema & model
const ProductsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true]
  },
  type: {
    type: String,
    required: true
  },
  manufacture_date: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
})

const Products = mongoose.model('products', ProductsSchema)
module.exports = Products
