const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  try {
    const {
      username,
      email,
      password,
    } = req.body;

    const existing =
      await pool.query(
        `
        SELECT *
        FROM users
        WHERE email = $1
      `,
        [email]
      );

    if (existing.rows.length) {
      return res.status(400).json({
        message:
          "Email already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const result =
      await pool.query(
        `
        INSERT INTO users
        (
          username,
          email,
          password_hash
        )
        VALUES
        ($1,$2,$3)
        RETURNING id,username,email
      `,
        [
          username,
          email,
          hashedPassword,
        ]
      );

    res.status(201).json(
      result.rows[0]
    );
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Server error",
    });
  }
}

module.exports = {
  register,
  login,
};

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      `
      SELECT *
      FROM users
      WHERE email = $1
    `,
      [email]
    );

    if (!result.rows.length) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const user = result.rows[0];

    const isMatch =
      await bcrypt.compare(
        password,
        user.password_hash
      );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
}
