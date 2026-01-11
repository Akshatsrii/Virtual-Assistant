import User from "../models/user.model.js";
import uploadOnCloudinary from "../config/cloudinary.js";
import geminiResponse from "../gemini.js";
import moment from "moment";

// ================= GET CURRENT USER =================
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("GET CURRENT USER ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get current user",
    });
  }
};

// ================= UPDATE ASSISTANT =================
export const updateAssistant = async (req, res) => {
  try {
    const { assistantName, imageUrl } = req.body;

    let assistantImage = imageUrl || null;

    if (req.file) {
      assistantImage = await uploadOnCloudinary(req.file.path);
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        assistantName,
        assistantImage,
      },
      { new: true }
    ).select("-password");

    return res.status(200).json(user); // 🔥 MUST BE HERE
  } catch (error) {
    console.error("UPDATE ASSISTANT ERROR:", error);
    return res.status(500).json({ message: "Update assistant error" });
  }
};

// ================= ASK TO ASSISTANT =================
export const askToAssistant = async (req, res) => {
  try {
    const { command } = req.body;

    if (!command) {
      return res.json({
        type: "general",
        userInput: "",
        response: "Command is required.",
      });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.json({
        type: "general",
        userInput: command,
        response: "User not found.",
      });
    }

    const userName = user.name;
    const assistantName = user.assistantName;

    // 🔹 Call Gemini
    const result = await geminiResponse(command, assistantName, userName);

    // 🔹 Extract JSON safely
    let gemResult;
    try {
      const jsonMatch = result.match(/{[\s\S]*}/);
      if (!jsonMatch) throw new Error("No JSON found");
      gemResult = JSON.parse(jsonMatch[0]);
    } catch (err) {
      console.error("JSON parse error:", err);
      return res.json({
        type: "general",
        userInput: command,
        response: "Sorry, I couldn't understand that.",
      });
    }

    const type = gemResult.type || "general";
    const userInput = gemResult.userinput || command;

    switch (type) {
      case "get_date":
        return res.json({
          type,
          userInput,
          response: `Today's date is ${moment().format("YYYY-MM-DD")}`,
        });

      case "get_time":
        return res.json({
          type,
          userInput,
          response: `Current time is ${moment().format("hh:mm A")}`,
        });

      case "get_day":
        return res.json({
          type,
          userInput,
          response: `Today is ${moment().format("dddd")}`,
        });

      case "get_month":
        return res.json({
          type,
          userInput,
          response: `Current month is ${moment().format("MMMM")}`,
        });

      case "google_search":
      case "youtube_search":
      case "youtube_play":
      case "calculator_open":
      case "instagram_open":
      case "facebook_open":
      case "weather-show":
      case "general":
        return res.json({
          type,
          userInput,
          response:
            gemResult.response ||
            "Here is what I found.",
        });

      default:
        return res.json({
          type: "general",
          userInput,
          response: "I didn't understand that command.",
        });
    }
  } catch (error) {
    console.error("❌ askToAssistant error:", error);
    return res.json({
      type: "general",
      userInput: "",
      response: "Something went wrong. Please try again.",
    });
  }
};
