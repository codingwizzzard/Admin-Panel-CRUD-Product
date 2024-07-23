const { Router } = require("express");
const { addCategoryPage, addCategory } = require("../controllers/category.controller");

const catRouter = Router()

catRouter.get('/', addCategoryPage)
catRouter.post('/', addCategory)
// catRouter.get('/getData',getCatData)

module.exports = catRouter