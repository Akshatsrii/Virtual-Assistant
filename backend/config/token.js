import jwt from "jsonwebtoken";

const genToken = async (userId) => {
  try {
    const token = jwt.sign(
      { id: userId },                 // payload
      process.env.JWT_SECRET,         // secret key
      { expiresIn: "7d" }             // options
    );

    return token;
  } catch (error) {
    console.error("Token generation error:", error.message);
    throw error;
  }
};

export default genToken;
