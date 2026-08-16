const express = require("express");
const router = express.Router();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("GEMINI_API_KEY is missing in .env");
}

const genAI = new GoogleGenerativeAI(apiKey);

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a message.",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
    });

    const prompt = `
You are Vertex AI Tutor, an intelligent AI learning assistant
inside a Learning Management System.

Your main subject is Java programming.

Explain concepts clearly and simply for beginners.

Help students with:
- Java programming
- OOP concepts
- Java interview questions
- Debugging Java code
- Programming concepts
- Simple examples

Student question:
${message}
`;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    const answer = response.text();

    return res.json({
      success: true,
      answer: answer,
    });

  } catch (error) {

    console.error("Chatbot error:", error);

    return res.status(500).json({
      success: false,
      message: "Vertex AI Tutor is temporarily unavailable.",
      error: error.message,
    });
  }
});
router.post("/evaluate-assignment", async (req, res) => {
  try {
    const { assignment, answer } = req.body;

    if (!assignment || !answer || !answer.trim()) {
      return res.status(400).json({
        success: false,
        message: "Assignment and answer are required.",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
    });

    const prompt = `
You are an AI assignment evaluator for a Java Learning Management System.

Evaluate the student's answer based on the assignment.

Assignment:
${assignment}

Student Answer:
${answer}

Return a simple response in this exact format:

STATUS: CORRECT
FEEDBACK: Your answer is correct.
SUGGESTION: No changes needed.

OR

STATUS: WRONG
FEEDBACK: Explain briefly what is wrong.
SUGGESTION: Give a simple hint to help the student correct it.

Do not provide a full solution unless necessary.
Focus on helping the student learn.
`;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    const evaluation = response.text();

    return res.json({
      success: true,
      result: evaluation,
    });

  } catch (error) {

    console.error("Assignment evaluation error:", error);

    return res.status(500).json({
      success: false,
      message: "Assignment evaluation failed.",
      error: error.message,
    });
  }
});
module.exports = router;
