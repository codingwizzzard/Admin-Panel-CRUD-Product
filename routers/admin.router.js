const { Router } = require("express");
const { indexPage, signupPage, loginPage, insertData, logout, getData, profile, changePassword, changePassPage, forget, forgetPage, verifyOtp, verifyOtpPage, resetPassword, resetPasswordPage } = require("../controllers/admin.controller");
const passport = require("passport");
const { isAuth } = require("../middlewares/userAuth.middleware");

const admin_Router = Router()

admin_Router.get('/', isAuth, indexPage)

admin_Router.get('/signup', signupPage)
admin_Router.post('/signup', insertData)

admin_Router.get('/login', loginPage)
admin_Router.post('/local', passport.authenticate('local', { successRedirect: "/", failureRedirect: "/login" }))

admin_Router.get('/logout', logout)

admin_Router.get('/getData', getData)
admin_Router.get('/profile', isAuth, profile)

admin_Router.get('/changePassword', isAuth, changePassPage)
admin_Router.post('/changePassword', isAuth, changePassword)

admin_Router.get('/forget', forgetPage)
admin_Router.post('/forget', forget)

admin_Router.post('/verifyOtp', verifyOtp)
admin_Router.get('/verifyOtp', verifyOtpPage)

admin_Router.get('/resetPassword', resetPasswordPage)
admin_Router.post('/resetPassword', resetPassword)

module.exports = admin_Router