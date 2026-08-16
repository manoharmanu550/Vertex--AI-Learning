const express = require("express");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./db");

const router = express.Router();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const existingUser = await db.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await db.query(
      `INSERT INTO users (name, email, password_hash, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role`,
      [name, email, passwordHash, role || "student"]
    );

    res.status(201).json({
      message: "User registered successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});
// Forgot Password
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const result = await db.query(
      "SELECT id, name, email FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Email not registered",
      });
    }

    const user = result.rows[0];

    const resetToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        purpose: "password-reset",
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const resetLink =
      `http://localhost:5173/reset-password?token=${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Vertex AI LMS - Password Reset",
      html: `
        <h2>Vertex AI LMS</h2>
        <p>Hello ${user.name},</p>
        <p>You requested to reset your password.</p>
        <p>Click the button below to reset your password:</p>

        <p>
          <a href="${resetLink}">
            Reset Password
          </a>
        </p>

        <p>This link will expire in 15 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
      `,
    });

    res.json({
      message: "Password reset link sent to your email.",
    });

  } catch (error) {
    console.error("Forgot password error:", error);

    res.status(500).json({
      message: "Unable to send password reset email",
    });
  }
});
// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});
// Reset Password
router.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        message: "Token and new password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (decoded.purpose !== "password-reset") {
      return res.status(400).json({
        message: "Invalid reset token",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await db.query(
      "UPDATE users SET password_hash = $1 WHERE id = $2",
      [passwordHash, decoded.id]
    );

    res.json({
      message: "Password reset successful",
    });
  } catch (error) {
    console.error("Reset password error:", error);

    res.status(400).json({
      message: "Invalid or expired reset link",
    });
  }
});

module.exports = router;
module.exports = router;