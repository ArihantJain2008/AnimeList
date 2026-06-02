const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  addAnime,
  getMyList,
  updateAnime,
  deleteAnime,
} = require(
  "../controllers/listController"
);

router.post(
  "/add",
  authMiddleware,
  addAnime
);

router.get(
  "/",
  authMiddleware,
  getMyList
);

router.patch(
  "/:id",
  authMiddleware,
  updateAnime
);

router.delete(
  "/:id",
  authMiddleware,
  deleteAnime
);

module.exports = router;