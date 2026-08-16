const express = require("express");
const db = require("./db");

const router = express.Router();

// Get all courses
router.get("/", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT courses.id,
             courses.title,
             courses.description,
             courses.instructor_id,
             users.name AS instructor_name,
             courses.created_at
      FROM courses
      LEFT JOIN users ON courses.instructor_id = users.id
      ORDER BY courses.created_at DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
});

// Create course
router.post("/", async (req, res) => {
  try {
    const { title, description, instructor_id } = req.body;

    if (!title || !instructor_id) {
      return res.status(400).json({
        message: "Title and instructor_id are required",
      });
    }

    const result = await db.query(
      `INSERT INTO courses (title, description, instructor_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [title, description || "", instructor_id]
    );

    res.status(201).json({
      message: "Course created successfully",
      course: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create course" });
  }
});

module.exports = router;