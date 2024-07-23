const extraCatModel = require("../models/extraCategory.Schema")

exports.extCatPage = (req, res) => {
    return res.render('./pages/addExtraCategory', { info: req.flash('info')})
}

exports.addExtCat = async (req, res) => {
    try {
        await extraCatModel.create(req.body)
        req.flash('info', 'Extra-Category added successfully!')
        return res.redirect('back')
    } catch (error) {
        return res.send(error.message)
    }
}