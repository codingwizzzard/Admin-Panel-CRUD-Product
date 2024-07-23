const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
    // subCategory: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'subCatTbl',
    // }
})

const catModel = mongoose.model('categoryTbl', categorySchema)

module.exports = catModel