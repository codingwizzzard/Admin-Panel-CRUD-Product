const { Router } = require("express");
const { addSubCategory, addSubCategoryPage } = require("../controllers/subCategory.controller");

const subCatRouter = Router()

subCatRouter.get('/', addSubCategoryPage)
subCatRouter.post('/', addSubCategory)
// subCatRouter.get('/getsubcatdata',getExtCat)

module.exports = subCatRouter