const subCatModel = require("../models/subCategory.Schema")

exports.addSubCategory = async (req, res) => {
    try {
        await subCatModel.create(req.body)
        req.flash('info', 'Sub-Category added successfully!')
        return res.redirect('back')
    } catch (error) {
        return res.send(error.message)
    }
}

exports.addSubCategoryPage = (req, res) => {
    return res.render('./pages/addSubCategory', { info: req.flash('info')})
}