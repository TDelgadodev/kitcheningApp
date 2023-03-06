module.exports = (req,res,next) => {
    if (req.cookies.userKitchening) {
            req.session.userLogin = req.cookies.userKitchening
    }
    next()
}