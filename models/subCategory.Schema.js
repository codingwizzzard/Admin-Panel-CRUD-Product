const mongoose = require('mongoose')

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
    // extraCategory: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'extraCatTbl',
    // }
})

const subCatModel = mongoose.model('subCatTbl', subCategorySchema)

module.exports = subCatModel