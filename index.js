const express = require('express')
const db = require('./config/database')
const path = require('path')
const P_router = require('./routers/product.router')
const catRouter = require('./routers/category.router')
const subCatRouter = require('./routers/subCategory.router')
const extCatRouter = require('./routers/extraCategory.router')
const admin_Router = require('./routers/admin.router')
const localAuth = require('./middlewares/localAuth.middleware')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')
const { isAuth } = require('./middlewares/userAuth.middleware')
const cookieParser = require('cookie-parser')

const port = 1303

localAuth(passport)

const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))

app.use(session({ secret: "key", resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())

app.use(flash())

app.use(express.static(path.join(__dirname + "/public")))
app.use(express.static(path.join(__dirname + "/partials")))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(admin_Router)
app.use(isAuth)
app.use('/product', P_router)
app.use('/category', catRouter)
app.use('/subCategory', subCatRouter)
app.use('/extraCategory', extCatRouter)

app.listen(port, (err) => {
    db()
    if (err) {
        console.log(err)
    }
    console.log("Server started at http://localhost:" + port)
})