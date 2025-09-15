const express = require("express");
const authRouter = require("./authRouter");
const blogRouter = require("./blogRouter");
const profileRouter = require("./profileRouter");

const router = express.Router();

router.use("/", authRouter);
router.use("/blogs", blogRouter);
router.use("/profile", profileRouter);

module.exports = router;
