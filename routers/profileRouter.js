const express = require("express");
const upload = require("../middleware/upload");
const passport = require("../middleware/passport");
const { profilePage, editProfilePage, updateProfile, deleteProfile } = require("../controller/profileController");

const router = express.Router();

router.get("/", passport.userAuth, profilePage);
router.get("/edit", passport.userAuth, editProfilePage);
router.post("/edit", passport.userAuth, upload.single("avatar"), updateProfile);
router.post("/delete", passport.userAuth, deleteProfile);

module.exports = router;
