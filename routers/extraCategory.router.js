const { Router } = require("express");
const { extCatPage, addExtCat } = require("../controllers/extraCategory.controller");

const extCatRouter = Router()

extCatRouter.get('/', extCatPage)
extCatRouter.post('/', addExtCat)

module.exports = extCatRouter