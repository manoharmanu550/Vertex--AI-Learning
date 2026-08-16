const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("./db");

const router = express.Router();

// Mark lesson as completed
router.post("/complete", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const { course_id, lesson_id } = req.body;

    if (!course_id || !lesson_id) {
      return res.status(400).json({
        message: "course_id and lesson_id are required",
      });
    }

    const result = await db.query(
      `
      INSERT INTO lesson_progress
        (user_id, course_id, lesson_id, completed)
      VALUES
        ($1, $2, $3, TRUE)
      ON CONFLICT (user_id, course_id, lesson_id)
      DO UPDATE SET
        completed = TRUE,
        completed_at = CURRENT_TIMESTAMP
      RETURNING *
      `,
      [decoded.id, course_id, lesson_id]
    );

    res.json({
      message: "Lesson completed successfully",
      progress: result.rows[0],
    });

  } catch (error) {
    console.error("Complete lesson error:", error);

    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
});

// Get completed lessons for logged-in user
router.get("/", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const result = await db.query(
      `
      SELECT
        id,
        course_id,
        lesson_id,
        completed,
        completed_at
      FROM lesson_progress
      WHERE user_id = $1
      ORDER BY completed_at DESC
      `,
      [decoded.id]
    );

    res.json(result.rows);

  } catch (error) {
    console.error("Get progress error:", error);

    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
});

module.exports = router;