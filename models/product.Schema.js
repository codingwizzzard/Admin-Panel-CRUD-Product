const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
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
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categoryTbl'
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subCatTbl',
    },
    extraCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'extraCatTbl',
    }
})

const ProductModel = mongoose.model('ProductTbl', ProductSchema)

module.exports = ProductModel