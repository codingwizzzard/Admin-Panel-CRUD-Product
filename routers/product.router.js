const { Router } = require("express");
const { addProduct, productPage, viewProductPage, deleteData, editData, getCatData, addProductPage, viewProduct } = require("../controllers/product.controller");
const upload = require("../middlewares/multer.middleware");

const P_router = Router()

P_router.get('/', productPage)

P_router.post('/add', upload, addProduct)
P_router.get('/add', addProductPage)

P_router.get('/viewProduct', viewProductPage)

P_router.get('/deleteData/:id', deleteData)

P_router.get('/editData/:id', editData)

P_router.get('/productData', viewProduct)

module.exports = P_router