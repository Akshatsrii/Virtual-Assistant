import React, { useContext, useEffect, useRef, useState } from "react";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const {
    userData,
    loading,
    logout,
    getGeminiResponse,
  } = useContext(userDataContext);

  const recognitionRef = useRef(null);
  const isRecognizingRef = useRef(false);
  const isSpeakingRef = useRef(false);

  const [listening, setListening] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  const synth = window.speechSynthesis;

  // 🔓 AUDIO UNLOCK
  const unlockAudio = () => {
    const u = new SpeechSynthesisUtterance("Assistant activated");
    synth.speak(u);
    setAudioUnlocked(true);
  };

  // 🔊 SPEAK (NEVER SILENT)
  const speak = (text) => {
    const finalText =
      text && text.trim()
        ? text
        : "Sorry, I could not get the response.";

    if (recognitionRef.current && isRecognizingRef.current) {
      recognitionRef.current.stop();
    }

    const speakNow = () => {
      const voices = synth.getVoices();
      if (!voices.length) return;

      const utterance = new SpeechSynthesisUtterance(finalText);
      utterance.voice =
        voices.find((v) => v.lang === "en-US") || voices[0];

      isSpeakingRef.current = true;

      utterance.onend = () => {
        isSpeakingRef.current = false;
        setTimeout(startRecognitionSafe, 1000);
      };

      synth.speak(utterance);
    };

    if (synth.getVoices().length === 0) {
      synth.onvoiceschanged = speakNow;
    } else {
      speakNow();
    }
  };

  // 🎤 SAFE START
  const startRecognitionSafe = () => {
    if (
      recognitionRef.current &&
      !isRecognizingRef.current &&
      !isSpeakingRef.current &&
      audioUnlocked
    ) {
      try {
        recognitionRef.current.start();
      } catch {}
    }
  };


  // 🎙️ SPEECH RECOGNITION
  useEffect(() => {
     if (!userData?.assistantName || !audioUnlocked) return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";

    recognitionRef.current = recognition;

    recognition.onstart = () => {
      isRecognizingRef.current = true;
      setListening(true);
    };

    recognition.onend = () => {
      isRecognizingRef.current = false;
      setListening(false);

      if (!isSpeakingRef.current) {
        setTimeout(startRecognitionSafe, 1000);
      }
    };

    recognition.onresult = async (e) => {
      const transcript =
        e.results[e.results.length - 1][0].transcript.trim();

      console.log("🎤 Heard:", transcript);

      if (
        transcript
          .toLowerCase()
          .includes(userData.assistantName.toLowerCase())
      ) {
        recognition.stop();

        let data = null;
        try {
          data = await getGeminiResponse(transcript);
        } catch {}

        console.log("🤖 Gemini data:", data);

        // 🔥 ALWAYS SPEAK
        speak(data?.response);
      }
    };

    startRecognitionSafe();

    return () => recognition.stop();
  }, [userData, audioUnlocked]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gradient-to-t from-black to-[#02023d] flex flex-col items-center justify-center gap-6 relative">

      <button
        onClick={logout}
        className="absolute top-5 right-5 bg-white text-black px-6 py-2 rounded-full font-semibold"
      >
        Log Out
      </button>

      <button
        onClick={() => navigate("/customize")}
        className="absolute top-5 left-5 bg-white text-black px-6 py-2 rounded-full font-semibold"
      >
        Customize
      </button>

      {!audioUnlocked && (
        <button
          onClick={unlockAudio}
          className="bg-green-500 text-white px-8 py-3 rounded-full font-semibold"
        >
          Start Assistant
        </button>
      )}

      <div className="w-[300px] h-[400px] rounded-3xl overflow-hidden shadow-2xl bg-gray-700 flex items-center justify-center">
        {userData?.assistantImage ? (
          <img
            src={userData.assistantImage}
            alt="assistant"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-white">No Image</span>
        )}
      </div>

      <h1 className="text-white text-xl font-semibold">
        {userData?.assistantName}
      </h1>

      <p className="text-sm text-green-400">
        {listening ? "Listening..." : "Idle"}
      </p>
    </div>
  );
}

export default Home;
