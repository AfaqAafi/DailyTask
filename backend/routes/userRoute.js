const express = require("express");
const {
  registerUser,
  authUser,
  logoutUsers,
} = require("../controllers/userController");
const router = express.Router();

/**
 *  @desc Register a new user
    @route POST /api/users
   
 */
router.post("/", registerUser);

/**
 *  @desc Auth User /set token
    @route POST /api/users/auth
    */
router.post("/auth", authUser);

/**
 *  @desc Logout User
    @route POST /api/logout
  */
router.post("/logout", logoutUsers);

module.exports = router;
