const axios = require("axios");
const Email = require("../models/Email");

exports.generateEmail = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || prompt.trim() === "") {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        contents: [{ parts: [{ text: `Write a professional email: ${prompt}` }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": process.env.GEMINI_API_KEY,
        },
      }
    );

    const generatedText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated.";

    const newEmail = new Email({ prompt, generatedEmail: generatedText });
    await newEmail.save();

    res.json({ generatedEmail: generatedText });
  } catch (error) {
    console.error("Error generating email:", error.response?.data || error.message);
    res.status(500).json({
      error: "Failed to generate email",
      details: error.response?.data || error.message,
    });
  }
};
