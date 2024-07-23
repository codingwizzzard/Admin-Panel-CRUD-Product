const userDB = require("../models/admin.Schema")
const mailer = require("nodemailer")

exports.indexPage = (req, res) => {
    return res.render("index")
}

exports.signupPage = (req, res) => {
    return res.render("./pages/signup")
}

exports.insertData = async (req, res) => {
    try {
        await userDB.create(req.body)
        res.redirect("/login")
    } catch (error) {
        console.log(error)
    }
}

exports.loginPage = (req, res) => {
    return res.render("./pages/login")
}

exports.logout = async (req, res) => {
    req.logOut((err) => {
        if (err) {
            return res.send(err.message)
        }
    })
    return res.redirect("back")
}

exports.getData = async (req, res) => {
    try {
        let data = await userDB.find({})
        res.send(data)
    } catch (error) {
        console.log(error)
    }
}

exports.profile = (req, res) => {
    let user = req.user
    return res.render("./pages/profile", { user })
}

exports.changePassPage = (req, res) => {
    return res.render("./pages/changePassword")
}

exports.changePassword = async (req, res) => {
    let id = req.user.id
    console.log(id)

    try {
        await userDB.findByIdAndUpdate(id, {
            password: req.body.password
        })

        return res.redirect("/logout")
    } catch (error) {
        return res.send(error.message)
    }
}

exports.forget = async (req, res) => {
    console.log("Request body:", req.body)
    const { email } = req.body
    let user = await userDB.findOne({ email: email })

    if (!user) {
        console.log("Wrong email id...")
        return res.redirect("back")
    }

    otp = Math.floor(1000 + Math.random() * 9000)
    const transporter = await mailer.createTransport({
        service: "gmail",
        auth: {
            user: "harshshah123346@gmail.com",
            pass: "bief okko lsde jxyh"
        }
    })

    const mailOption = {
        from: "harshshah123346@gmail.com",
        to: req.body.email,
        subject: "Verify OTP",
        html: `<p>This is your OTP for password reset.</p><h2>OTP: ${otp}</h2>`
    }

    transporter.sendMail(mailOption, (err, info) => {
        if (err) {
            console.error(err)
            return res.redirect("/forget")
        } else {
            res.cookie('email', email)
            console.log(info)
            return res.redirect("/verifyOtp")
        }
    })
}

exports.forgetPage = (req, res) => {
    return res.render("./pages/forgotPassword")
}

let otp
exports.verifyOtp = (req, res) => {
    let token = req.body.otp
    if (token == otp) {
        return res.redirect("/resetPassword")
    } else {
        return res.redirect("/verifyOtp")
    }
}

exports.verifyOtpPage = (req, res) => {
    res.render("./pages/verifyOtp")
}

exports.resetPasswordPage = (req, res) => {
    res.render("./pages/resetPassword")
}

exports.resetPassword = async (req, res) => {
    const { password, cpassword } = req.body

    if (password !== cpassword) {
        console.log("Passwords do not match...")
        return res.redirect("back")
    }

    try {
        let email = req.cookies.email
        let user = await userDB.findOne({ email: email })

        if (!user) {
            console.log("No user found with the email:", email)
            return res.redirect("back")
        }

        let { id } = user
        await userDB.findByIdAndUpdate(id, { password: password })

        res.clearCookie('email')
        return res.redirect("/login")
    } catch (error) {
        console.error("Error resetting password:", error)
        return res.redirect("back")
    }
}