import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const geminiResponse = async (
  userInput,
  assistantName = "Assistant",
  userName = "Author"
) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("❌ GEMINI_API_KEY is missing in .env");
    return "";
  }

  const MODEL = "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;

  // ✅ FIXED SYSTEM PROMPT
  const prompt = `
You are a virtual assistant named ${assistantName} created by ${userName}.
You are not Google. You behave like a voice-enabled assistant.

Your task is to understand the user's natural language input
and respond ONLY with a valid JSON object in the following format:

{
  "type": "general" | "google_search" | "youtube_search" | "youtube_play" |
          "get_time" | "get_date" | "get_day" | "get_month" |
          "calculator_open" | "instagram_open" | "facebook_open" |
          "weather-show",

  "userinput": "<original user input>"
    (remove assistant name if present;
     if user says search on google/youtube, keep ONLY the search text),

  "response": "<short voice-friendly response to speak to the user>"
}

Type meanings:
- "general": normal conversation
- "google_search": search on Google
- "youtube_search": search on YouTube
- "youtube_play": play video or song
- "calculator_open": open calculator
- "instagram_open": open Instagram
- "facebook_open": open Facebook
- "weather-show": weather info
- "get_time": current time
- "get_date": today's date
- "get_day": current day
- "get_month": current month

IMPORTANT RULES:
- If someone asks "tumhe kisne banaya", say "${userName} ne mujhe banaya"
- ONLY return valid JSON
- No explanation
- No markdown
- No extra text

Now user input:
${userInput}
`;

  try {
    const response = await axios.post(
      url,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return (
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || ""
    );
  } catch (error) {
    const errorMsg =
      error.response?.data?.error?.message || error.message;

    console.error(`🤖 Gemini Error [${MODEL}]:`, errorMsg);
    return "";
  }
};

export default geminiResponse;
