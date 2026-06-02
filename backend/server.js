const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const listRoutes = require("./routes/listRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/user",
  userRoutes
);

app.use(
  "/api/list",
  listRoutes
);

app.get("/", (req, res) => {
  res.json({
    message: "Anime Tracker API Running",
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});