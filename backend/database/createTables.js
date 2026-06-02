const pool = require("../config/db");

async function createTables() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            email VARCHAR(255) NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            `);

            console.log(
                "Users table created successfully!"
            );

            await pool.query(`
  CREATE TABLE IF NOT EXISTS user_lists (
    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL,

    anime_id INTEGER NOT NULL,

    title TEXT NOT NULL,

    cover_image TEXT,

    status VARCHAR(30)
      DEFAULT 'Watching',

    rating INTEGER DEFAULT 0,

    progress INTEGER DEFAULT 0,

    favorite BOOLEAN
      DEFAULT FALSE,

    created_at TIMESTAMP
      DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
      REFERENCES users(id)
      ON DELETE CASCADE
  );
`);

console.log(
  "user_lists table created!"
);

            await pool.query(`
  CREATE TABLE IF NOT EXISTS feedback (
    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL,

    type VARCHAR(50) NOT NULL,

    subject VARCHAR(150) NOT NULL,

    message TEXT NOT NULL,

    rating INTEGER,

    created_at TIMESTAMP
      DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
      REFERENCES users(id)
      ON DELETE CASCADE,

    CONSTRAINT feedback_rating_range
      CHECK (
        rating IS NULL OR (
          rating >= 1 AND rating <= 5
        )
      )
  );
`);

console.log(
  "feedback table created!"
);

            await pool.query(`
  CREATE INDEX IF NOT EXISTS idx_feedback_user_id_created_at
  ON feedback (user_id, created_at DESC);
`);

console.log(
  "feedback index created!"
);

             process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

createTables();
