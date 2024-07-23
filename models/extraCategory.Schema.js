const mongoose = require('mongoose')

const extraCatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const extraCatModel = mongoose.model('extraCatTbl',extraCatSchema)

module.exports = extraCatModel