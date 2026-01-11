import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const userDataContext = createContext(null);

function UserContext({ children }) {
  const serverUrl = "http://localhost:8000";

 
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);


  const [selectedImage, setSelectedImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [assistantName, setAssistantName] = useState("");

  const handleCurrentUser = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/user/me`, {
        withCredentials: true,
      });

      const user = res.data.user || res.data;

      setUserData(user);
      setAssistantName(user?.assistantName || "");
    } catch (error) {
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  const getGeminiResponse = async (command) => {
  try {
    const token = localStorage.getItem("token"); // or wherever you store it

    const result = await axios.post(
      `${serverUrl}/api/user/ask`,
      { command },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return result.data;
  } catch (error) {
    console.error(
      "Gemini response error:",
      error.response?.data || error.message
    );
    return null;
  }
};


  const logout = async () => {
    try {
      await axios.post(
        `${serverUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.log("Logout error", error);
    } finally {
      setUserData(null);
      setSelectedImage(null);
      setBackendImage(null);
      setAssistantName("");
    }
  };

  // ================= RUN ON APP LOAD =================
  useEffect(() => {
    handleCurrentUser();
  }, []);

  // ================= CONTEXT VALUE =================
  const value = {
    // backend
    serverUrl,

    // auth
    userData,
    setUserData,
    loading,
    handleCurrentUser,
    logout,

    // assistant
    getGeminiResponse, // ✅ EXPOSED HERE

    // customize (image)
    selectedImage,
    setSelectedImage,
    backendImage,
    setBackendImage,

    // customize (name)
    assistantName,
    setAssistantName,
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
