const pool = require("../config/db");

async function addAnime(req, res) {
  try {
    const userId = req.user.userId;

    const {
      anime_id,
      title,
      cover_image,
      status,
    } = req.body;

    const existing = await pool.query(
      `
      SELECT *
      FROM user_lists
      WHERE user_id = $1
      AND anime_id = $2
      `,
      [userId, anime_id]
    );

    if (existing.rows.length) {
      return res.status(400).json({
        message:
          "Anime already exists in list",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO user_lists
      (
        user_id,
        anime_id,
        title,
        cover_image,
        status
      )
      VALUES
      ($1,$2,$3,$4,$5)
      RETURNING *
      `,
      [
        userId,
        anime_id,
        title,
        cover_image,
        status || "Watching",
      ]
    );

    res.status(201).json(
      result.rows[0]
    );
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
}

async function getMyList(req, res) {
  try {
    const userId = req.user.userId;

    const result = await pool.query(
      `
      SELECT *
      FROM user_lists
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
}

async function updateAnime(req, res) {
  try {
    const { id } = req.params;

    const {
      status,
      rating,
      progress,
      favorite,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE user_lists
      SET
        status = $1,
        rating = $2,
        progress = $3,
        favorite = $4
      WHERE id = $5
      RETURNING *
      `,
      [
        status,
        rating,
        progress,
        favorite,
        id,
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
}

async function deleteAnime(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM user_lists
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        message: "Anime not found",
      });
    }

    res.json({
      message: "Anime removed",
      anime: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
}

module.exports = {
  addAnime,
  getMyList,
  updateAnime,
  deleteAnime,
};
