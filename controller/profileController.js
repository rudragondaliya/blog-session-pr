const User = require("../models/users");
const Blog = require("../models/blog");


exports.profilePage = async (req, res) => {
    try {
        const user = req.user;
    
        const blogs = await Blog.find({ author: user._id }).sort({ createdAt: -1 });
        res.render("pages/profile", { title: "Profile", user, blogs });
    } catch (err) {
        console.log(err.message);
        res.redirect("/home");
    }
};


exports.editProfilePage = (req, res) => {
    res.render("pages/editProfile", { title: "Edit Profile", user: req.user });
};


exports.updateProfile = async (req, res) => {
    try {
        const { username, bio } = req.body;
        const updateData = { username, bio };
        if (req.file) updateData.avatar = `/uploads/${req.file.filename}`;
        await User.findByIdAndUpdate(req.user._id, updateData);
        res.redirect("/profile");
    } catch (err) {
        console.log(err.message);
        res.redirect("/profile/edit");
    }
};


exports.deleteProfile = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user._id);
        req.logout(() => {
            res.redirect("/");
        });
    } catch (err) {
        console.log(err.message);
        res.redirect("/profile");
    }
};
