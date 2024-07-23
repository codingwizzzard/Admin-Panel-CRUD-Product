const catModel = require("../models/category.Schema")

exports.addCategoryPage = (req, res) => {
    return res.render('./pages/addCategory', { info: req.flash('info') })
}

exports.addCategory = async (req, res) => {
    try {
        await catModel.create(req.body)
        req.flash('info', 'Category added successfully!')
        return res.redirect('back')
    } catch (error) {
        return res.send(error.message)
    }
}