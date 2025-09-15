const bodyParser = require("body-parser");
const express = require("express");
const db = require("./config/database");
const router = require("./routers");
const session = require("express-session");
const passport = require("passport");
const app = express();
const flash = require("connect-flash")
const port = 8003;


app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static("public"))
app.use("/uploads",express.static('uploads'))

app.use(session({
    secret:"Rudra",
    resave:false,
    saveUninitialized:false
}))

app.use(flash())

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg") || null;
  res.locals.error_msg = req.flash("error_msg") || null;
  next();
});

app.use(passport.initialize());
app.use(passport.session())

app.use("/",router)

app.listen(port,(error)=>{
    if(!error){
        db();
        console.log("server is started...");
        console.log("http://localhost:"+port);
    }
})