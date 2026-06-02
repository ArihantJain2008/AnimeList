const bcrypt = require("bcrypt");
const pool = require("../config/db");

const USERNAME_MIN_LENGTH = 2;
const USERNAME_MAX_LENGTH = 50;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 72;
const PASSWORD_SALT_ROUNDS = 10;

async function getProfile(req, res) {
  try {
    const userId = req.user.userId;

    const result = await pool.query(
      `
      SELECT id, username, email
      FROM users
      WHERE id = $1
      `,
      [userId]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
}

async function updateProfile(req, res) {
  try {
    const userId = req.user.userId;
    const username =
      req.body.username?.trim() ?? "";

    if (!username) {
      return res.status(400).json({
        message:
          "Username cannot be empty",
      });
    }

    if (
      username.length <
        USERNAME_MIN_LENGTH ||
      username.length >
        USERNAME_MAX_LENGTH
    ) {
      return res.status(400).json({
        message: `Username must be ${USERNAME_MIN_LENGTH}-${USERNAME_MAX_LENGTH} characters long`,
      });
    }

    const existingUser =
      await pool.query(
        `
        SELECT id
        FROM users
        WHERE username = $1
        AND id <> $2
        `,
        [
          username,
          userId,
        ]
      );

    if (existingUser.rows.length) {
      return res.status(409).json({
        message:
          "Username is already taken",
      });
    }

    const result = await pool.query(
      `
      UPDATE users
      SET username = $1
      WHERE id = $2
      RETURNING id, username, email
      `,
      [
        username,
        userId,
      ]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
}

async function updatePassword(req, res) {
  try {
    const userId = req.user.userId;
    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = req.body;

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      return res.status(400).json({
        message:
          "All password fields are required",
      });
    }

    if (
      newPassword.length <
        PASSWORD_MIN_LENGTH ||
      newPassword.length >
        PASSWORD_MAX_LENGTH
    ) {
      return res.status(400).json({
        message: `New password must be ${PASSWORD_MIN_LENGTH}-${PASSWORD_MAX_LENGTH} characters long`,
      });
    }

    if (
      newPassword !==
      confirmPassword
    ) {
      return res.status(400).json({
        message:
          "New password and confirmation do not match",
      });
    }

    const result = await pool.query(
      `
      SELECT id, password_hash
      FROM users
      WHERE id = $1
      `,
      [userId]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = result.rows[0];

    const isCurrentPasswordValid =
      await bcrypt.compare(
        currentPassword,
        user.password_hash
      );

    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        message:
          "Current password is incorrect",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        PASSWORD_SALT_ROUNDS
      );

    await pool.query(
      `
      UPDATE users
      SET password_hash = $1
      WHERE id = $2
      `,
      [
        hashedPassword,
        userId,
      ]
    );

    res.json({
      message:
        "Password updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
}

module.exports = {
  getProfile,
  updateProfile,
  updatePassword,
};
