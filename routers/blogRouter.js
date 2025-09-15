const express = require("express");
const router = express.Router();
const blogController = require("../controller/blogController");
const multer = require("multer");


const upload = multer({ dest: "public/uploads/" });
router.get("/form", blogController.createBlogPage);
router.post("/", upload.single("image"), blogController.createBlog);

router.get("/edit/:id", blogController.editPage);
router.post("/edit/:id", upload.single("image"), blogController.editBlog);

router.post("/delete/:id", blogController.deleteBlog);

router.get("/details/:id", blogController.blogDetails);
router.post("/:id/like", blogController.likeBlog);       
router.post("/:id/dislike", blogController.dislikeBlog);
router.post("/:id/comment", blogController.addComment);
module.exports = router;
