const User = require("../models/users");
const Blog = require("../models/blog");
const bcrypt = require("bcrypt");


exports.loginPage = async (req, res) => {
  return res.render("index", { title: "Login" });
};

exports.signupPage = async (req, res) => {
  return res.render("pages/signup", { title: "Signup" });
};


exports.signup = async (req, res) => {
  try {
    let { username, email, password, bio } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarImage = req.file ? `/uploads/${req.file.filename}` : null;

    await User.create({
      username,
      email,
      password: hashPassword,
      bio,
      avatar: avatarImage,
    });

    req.flash("success_msg", "Signup successful! Please login.");
    return res.redirect("/");
  } catch (error) {
    console.log("Signup Error:", error.message);
    req.flash("error_msg", "Signup failed, try again.");
    return res.redirect("/signup");
  }
};


exports.login = async (req, res) => {
  req.flash("success_msg", "Login successful!");
  res.redirect("/home");
};


exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log("Logout Error:", err);
      req.flash("error_msg", "Error logging out");
      return res.redirect("/home");
    }
    req.flash("success_msg", "Logout successful!");
    res.redirect("/");
  });
};


exports.homePage = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .populate("author", "username avatar");

    res.render("pages/home", {
      title: "Home",
      heroBlog: blogs[0] || null,
      firstSection: blogs[1] || null,
      secondSection: blogs[2] || null,
      aboutSection: blogs[3] || null,
      blogs,
      user: req.user || null,
    });
  } catch (error) {
    console.error("Error loading home page:", error.message);
    res.status(500).send("Server Error");
  }
};

exports.changePassPage = (req, res) => {
  return res.render("./pages/changePass", { user: req.user });
};

exports.changePass = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    const user = await User.findById(req.user._id);
    const isValid = await bcrypt.compare(oldPassword, user.password);

    if (!isValid) {
      req.flash("error_msg", "Old password is incorrect");
      return res.redirect("/changePass");
    }

    if (newPassword !== confirmPassword) {
      req.flash("error_msg", "New password and confirm password do not match");
      return res.redirect("/changePass");
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    req.flash("success_msg", "Password updated successfully!");
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    req.flash("error_msg", "Server error, try again");
    return res.redirect("/changePass");
  }
};
