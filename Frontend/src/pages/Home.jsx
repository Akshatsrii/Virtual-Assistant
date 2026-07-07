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
  const isDirectCommandRef = useRef(false);
  const isProcessingRef = useRef(false);
  const activeUtteranceRef = useRef(null);

  const [listening, setListening] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [voiceCallMode, setVoiceCallMode] = useState(true);

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

    // Reset SpeechSynthesis queue to prevent Chrome freeze
    synth.cancel();
    isSpeakingRef.current = false;

    if (recognitionRef.current && isRecognizingRef.current) {
      recognitionRef.current.stop();
    }

    const speakNow = () => {
      const voices = synth.getVoices();
      const utterance = new SpeechSynthesisUtterance(finalText);
      
      // Keep object alive so Chrome doesn't garbage collect it and drop events
      activeUtteranceRef.current = utterance;
      
      if (voices.length > 0) {
        utterance.voice =
          voices.find((v) => v.lang.toLowerCase().startsWith("hi")) ||
          voices.find((v) => v.lang.toLowerCase().startsWith("en")) ||
          voices[0];
      }

      isSpeakingRef.current = true;

      utterance.onend = () => {
        isSpeakingRef.current = false;
        activeUtteranceRef.current = null;
        setTimeout(startRecognitionSafe, 800);
      };

      utterance.onerror = () => {
        isSpeakingRef.current = false;
        activeUtteranceRef.current = null;
        setTimeout(startRecognitionSafe, 800);
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
      !isProcessingRef.current &&
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
    recognition.continuous = !voiceCallMode;
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

      if (voiceCallMode) {
        // In Voice Call Mode, automatically respond to all speech segments upon pause
        isProcessingRef.current = true;
        recognition.stop();

        let data = null;
        try {
          data = await getGeminiResponse(transcript);
        } catch {}

        isProcessingRef.current = false;
        console.log("🤖 Gemini data:", data);

        // 🔥 ALWAYS SPEAK
        speak(data?.response);
      } else {
        // In Wake Word Mode, only respond when the assistant's name is mentioned
        const hasWakeWord = transcript
          .toLowerCase()
          .includes(userData.assistantName.toLowerCase());

        if (hasWakeWord || isDirectCommandRef.current) {
          isDirectCommandRef.current = false;
          isProcessingRef.current = true;
          recognition.stop();

          let data = null;
          try {
            data = await getGeminiResponse(transcript);
          } catch {}

          isProcessingRef.current = false;
          console.log("🤖 Gemini data:", data);

          // 🔥 ALWAYS SPEAK
          speak(data?.response);
        }
      }
    };

    startRecognitionSafe();

    return () => recognition.stop();
  }, [userData, audioUnlocked, voiceCallMode]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  const handleAvatarClick = () => {
    if (!audioUnlocked) {
      unlockAudio();
      return;
    }
    isDirectCommandRef.current = true;
    speak(`Yes, tell me. I am listening.`);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-t from-black to-[#02023d] flex flex-col items-center justify-center gap-6 relative">

      <button
        onClick={logout}
        className="absolute top-5 right-5 bg-white text-black px-6 py-2 rounded-full font-semibold"
      >
        Log Out
      </button>

      {/* MODE TOGGLE */}
      {audioUnlocked && (
        <div className="flex gap-2 bg-white/10 p-1.5 rounded-full border border-white/10 z-10">
          <button
            onClick={() => setVoiceCallMode(true)}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-250 cursor-pointer ${
              voiceCallMode
                ? "bg-white text-black shadow-lg"
                : "text-white/60 hover:text-white"
            }`}
          >
            Voice Call Mode
          </button>
          <button
            onClick={() => setVoiceCallMode(false)}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-250 cursor-pointer ${
              !voiceCallMode
                ? "bg-white text-black shadow-lg"
                : "text-white/60 hover:text-white"
            }`}
          >
            Wake Word Mode
          </button>
        </div>
      )}

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

      <div 
        onClick={handleAvatarClick}
        className="w-[300px] h-[400px] rounded-3xl overflow-hidden shadow-2xl bg-gray-700 flex items-center justify-center cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
      >
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
