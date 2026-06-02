const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  getProfile,
  updateProfile,
  updatePassword,
} = require("../controllers/userController");

router.get(
  "/profile",
  authMiddleware,
  getProfile
);

router.patch(
  "/profile",
  authMiddleware,
  updateProfile
);

router.patch(
  "/password",
  authMiddleware,
  updatePassword
);

module.exports = router;
