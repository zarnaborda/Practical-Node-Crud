const mongoose = require('mongoose')
// Map global promise - get rid of warning
mongoose.Promise = global.Promise

// connect to mongooes
mongoose.connect('mongodb://localhost/productmanagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => { throw new Error(err) })
