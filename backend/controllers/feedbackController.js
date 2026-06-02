const pool = require("../config/db");

const FEEDBACK_TYPES = [
  "Bug Report",
  "Feature Request",
  "Review",
  "Other",
];

const SUBJECT_MAX_LENGTH = 150;
const MESSAGE_MAX_LENGTH = 5000;
const RATING_MIN = 1;
const RATING_MAX = 5;

async function createFeedback(req, res) {
  try {
    const userId = req.user.userId;
    const type =
      req.body.type?.trim() ?? "";
    const subject =
      req.body.subject?.trim() ?? "";
    const message =
      req.body.message?.trim() ?? "";
    const rawRating =
      req.body.rating;

    if (!type) {
      return res.status(400).json({
        message:
          "Feedback type is required",
      });
    }

    if (
      !FEEDBACK_TYPES.includes(type)
    ) {
      return res.status(400).json({
        message:
          "Invalid feedback type",
      });
    }

    if (!subject) {
      return res.status(400).json({
        message:
          "Subject is required",
      });
    }

    if (
      subject.length >
      SUBJECT_MAX_LENGTH
    ) {
      return res.status(400).json({
        message: `Subject must be ${SUBJECT_MAX_LENGTH} characters or fewer`,
      });
    }

    if (!message) {
      return res.status(400).json({
        message:
          "Message is required",
      });
    }

    if (
      message.length >
      MESSAGE_MAX_LENGTH
    ) {
      return res.status(400).json({
        message: `Message must be ${MESSAGE_MAX_LENGTH} characters or fewer`,
      });
    }

    let rating = null;

    if (
      rawRating !== undefined &&
      rawRating !== null &&
      rawRating !== ""
    ) {
      rating = Number(rawRating);

      if (
        !Number.isInteger(rating) ||
        rating < RATING_MIN ||
        rating > RATING_MAX
      ) {
        return res.status(400).json({
          message: `Rating must be between ${RATING_MIN} and ${RATING_MAX}`,
        });
      }
    }

    const result = await pool.query(
      `
      INSERT INTO feedback
      (
        user_id,
        type,
        subject,
        message,
        rating
      )
      VALUES
      ($1,$2,$3,$4,$5)
      RETURNING
        id,
        user_id,
        type,
        subject,
        message,
        rating,
        created_at
      `,
      [
        userId,
        type,
        subject,
        message,
        rating,
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

async function getMyFeedback(
  req,
  res
) {
  try {
    const userId = req.user.userId;

    const result = await pool.query(
      `
      SELECT
        id,
        user_id,
        type,
        subject,
        message,
        rating,
        created_at
      FROM feedback
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

module.exports = {
  createFeedback,
  getMyFeedback,
};
