const fs = require('fs')
const catModel = require("../models/category.Schema")
const extraCatModel = require("../models/extraCategory.Schema")
const ProductModel = require("../models/product.Schema")
const subCatModel = require("../models/subCategory.Schema")

exports.productPage = async (req, res) => {
    try {
        let data = await ProductModel.find({})
            .populate('category')
            .populate('subCategory')
            .populate('extraCategory')
        return res.render('./pages/index', { data, info: req.flash('info') })
    } catch (error) {
        return res.send(error.message)
    }
}

exports.addProduct = async (req, res) => {
    const { title, description, price, category, subCategory, extraCategory, id } = req.body
    let image
    try {
        if (id) {
            if (req.file) {
                image = req.file.path
                let data = await ProductModel.findById(id)
                fs.unlinkSync(data.image)

                await ProductModel.findByIdAndUpdate(id, { title, description, price, category, subCategory, extraCategory, image })
                req.flash('info', 'Product updated successfully!')
            } else {
                let data = await ProductModel.findById(id)
                image = data.image
                await ProductModel.findByIdAndUpdate(id, { title, description, price, category, subCategory, extraCategory, image })
                req.flash('info', 'Product updated successfully!')
            }
        } else {
            await ProductModel.create({ ...req.body, image: req.file.path })
            req.flash('info', 'Product added successfully!')
        }
        return res.redirect('/product')
    } catch (error) {
        return res.send(error.message)
    }
}

exports.addProductPage = async (req, res) => {
    try {
        const categories = await catModel.find({})
        const subCategories = await subCatModel.find({})
        const extCategories = await extraCatModel.find({})
        return res.render('./pages/addProduct', { categories, subCategories, extCategories })
    } catch (error) {
        return res.send(error.message)
    }
}

exports.viewProductPage = async (req, res) => {
    try {
        const products = await ProductModel.find({}).populate('category').populate('subCategory').populate('extraCategory')
        return res.render('./pages/viewProduct', { products, info: req.flash('info') })
    } catch (error) {
        return res.send(error.message)
    }
}

exports.deleteData = async (req, res) => {
    let { id } = req.params

    try {
        let data = await ProductModel.findById(id)
        fs.unlinkSync(data.image)

        await ProductModel.findByIdAndDelete(id)
        req.flash('info', 'Product deleted successfully!')
        return res.redirect('/product/viewProduct')
    }
    catch (error) {
        return res.send(error.message)
    }
}

exports.editData = async (req, res) => {
    let { id } = req.params
    try {
        let data = await ProductModel.findById(id)
        const categories = await catModel.find({})
        const subCategories = await subCatModel.find({})
        const extCategories = await extraCatModel.find({})
        res.render('./pages/editProduct', { data, categories, subCategories, extCategories })
    } catch (error) {
        return res.send(error.message)
    }
}

exports.viewProduct = async (req, res) => {
    try {
        const products = await ProductModel.find({}).populate({
            path: "category"
        }).populate({
            path: "subCategory"
        }).populate({
            path: "extraCategory"
        })
        return res.send(products)
    } catch (error) {
        return res.send(error.message)
    }
}