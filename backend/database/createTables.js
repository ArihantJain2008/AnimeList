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


             process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

createTables();