const express = require("express");
const passport = require("../middleware/passport");
const upload = require("../middleware/upload");

const {
  loginPage,
  signupPage,
  signup,
  homePage,
  logout,
  changePassPage,
  changePass,
} = require("../controller/authController");

const authRouter = express.Router();

authRouter.get("/", loginPage);
authRouter.get("/signup", signupPage);
authRouter.post("/", passport.authenticate("local", {
  failureRedirect: "/",
  successRedirect: "/home"
}));
authRouter.post("/signup", upload.single("avatar"), signup);
authRouter.get("/home", passport.userAuth, homePage);
authRouter.get("/logout", logout);
authRouter.get("/changePass",passport.userAuth,changePassPage)
authRouter.post("/changePass/:id",changePass)

module.exports = authRouter;
