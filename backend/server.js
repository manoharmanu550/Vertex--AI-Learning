const express = require("express");
const authRoutes = require("./auth");
const courseRoutes = require("./courses");
const chatbotRoutes = require("./chatbot");
const cors = require("cors");
const progressRoutes = require("./progress");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   AUTH ROUTES
========================= */

app.use("/api/auth", authRoutes);

/* =========================
   COURSE ROUTES
========================= */

app.use("/api/courses", courseRoutes);
app.use("/api/progress", progressRoutes);

/* =========================
   AI CHATBOT ROUTES
========================= */

app.use("/api/chat", chatbotRoutes);

/* =========================
   HOME ROUTE
========================= */

app.get("/", (req, res) => {
  res.json({
    message: "Vertex AI LMS Backend is running!",
  });
});

/* =========================
   SERVER
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});