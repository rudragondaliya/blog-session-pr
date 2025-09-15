const passport = require("passport");
const User = require("../models/users");
const LocalStreagy = require("passport-local").Strategy;
const bcrypt = require("bcrypt")


passport.use("local",new LocalStreagy({usernameField:"email"},async(email,password,done)=>{
    try {
        let user = await User.findOne({email})
        if(!user){
            return done(null,false)
        }
        let isValid = await bcrypt.compare(password,user.password)
        if(!isValid){
            return done(null,false)
        }
        return done(null,user)
    } catch (error) {
        return done(null,false)
    }
}))

passport.serializeUser((user,done)=>{
    return done(null,user.id)
})

passport.deserializeUser(async(id,done)=>{
    try {
        let user = await User.findById(id)
        return done(null,user)
    } catch (error) {
        return done(null,false)
    }
})

passport.userAuth=(req,res,next)=>{
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        res.locals.user = req.user
        return next();
    }
    return res.redirect("/")
}

module.exports = passport