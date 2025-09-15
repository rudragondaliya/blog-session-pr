const Blog = require("../models/blog");
const User = require("../models/users");


exports.createBlogPage = (req, res) => {
    res.render("pages/blogForm", { title: "Add Blog" });
};



exports.createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;
        await Blog.create({
            title,
            content,
            image,
            author: req.user._id
        });
        res.redirect("/home");
    } catch (err) {
        console.log(err.message);
        res.redirect("/blogs/form");
    }
};


exports.editPage = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.redirect("/home");
        res.render("pages/editBlog", { title: "Edit Blog", blog });
    } catch (err) {
        console.log(err.message);
        res.redirect("/home");
    }
};


exports.editBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updateData = { title, content };
        if (req.file) updateData.image = `/uploads/${req.file.filename}`;

        await Blog.findByIdAndUpdate(req.params.id, updateData);
        res.redirect("/home");
    } catch (err) {
        console.log(err.message);
        res.redirect("/home");
    }
};


exports.deleteBlog = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.redirect("/home");
    } catch (err) {
        console.log(err.message);
        res.redirect("/home");
    }
};


exports.blogDetails = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("author");
        if (!blog) return res.redirect("/home");
        res.render("./pages/blogDetails", { title: blog.title, blog, user: req.user });
    } catch (err) {
        console.log(err.message);
        res.redirect("/home");
    }
};




exports.likeBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });

       
        const userId = req.user._id.toString();
        const index = blog.likesArray ? blog.likesArray.indexOf(userId) : -1;

        if (index === -1) {
            
            blog.likes = (blog.likes || 0) + 1;
            blog.likesArray = blog.likesArray || [];
            blog.likesArray.push(userId);
        } else {
           
            blog.likes = (blog.likes || 0) - 1;
            blog.likesArray.splice(index, 1);
        }

        await blog.save();
        res.json({ likes: blog.likes });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Server error" });
    }
};


exports.dislikeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const userId = req.user._id.toString();
    const index = blog.dislikesArray ? blog.dislikesArray.indexOf(userId) : -1;

    if (index === -1) {
      blog.dislikes = (blog.dislikes || 0) + 1;
      blog.dislikesArray = blog.dislikesArray || [];
      blog.dislikesArray.push(userId);
    } else {
      blog.dislikes = (blog.dislikes || 0) - 1;
      blog.dislikesArray.splice(index, 1);
    }

    await blog.save();
    res.json({ dislikes: blog.dislikes });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server error" });
  }
};




exports.addComment = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        const newComment = {
            text: req.body.text,
            author: req.user._id
        };

        blog.comments = blog.comments || [];
        blog.comments.push(newComment);
        await blog.save();

      
        await blog.populate('comments.author');

        
        const addedComment = blog.comments[blog.comments.length - 1];
        res.json({ author: { username: addedComment.author.username }, text: addedComment.text });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Server error" });
    }
};
