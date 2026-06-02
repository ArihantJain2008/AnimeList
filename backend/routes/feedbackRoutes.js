const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createFeedback,
  getMyFeedback,
} = require(
  "../controllers/feedbackController"
);

router.post(
  "/",
  authMiddleware,
  createFeedback
);

router.get(
  "/my",
  authMiddleware,
  getMyFeedback
);

module.exports = router;
