const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    name:String,
    encoded:String
})

module.exports = mongoose.model('data',dataSchema)