# 🤖 Virtual Assistant – MERN & Gemini AI

<p align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="100%" />
</p>

<div align="center">
  
  [![Made with MERN](https://img.shields.io/badge/Made%20with-MERN-00D9FF?style=for-the-badge&logo=mongodb)](https://github.com)
  [![Powered by Gemini AI](https://img.shields.io/badge/Powered%20by-Gemini%20AI-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)
  [![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
  
  **An intelligent, voice-powered AI assistant built with cutting-edge technology**
  
  [Demo](#-demo) • [Features](#-features) • [Installation](#-installation--setup) • [Documentation](#-how-it-works)
</div>



## 📌 Overview

Welcome to the **Virtual Assistant** – a revolutionary AI-powered companion that brings the future of human-computer interaction to your fingertips! Built with the powerful **MERN stack** and integrated with **Google's Gemini AI**, this assistant delivers an immersive, personalized experience through natural voice conversations.

<div align="center">
  <img src="./assets/image1.png" width="80%" alt="Virtual Assistant Interface"/>
</div>

### 🎯 What Makes It Special?

- 🎨 **Personalized Experience**: Choose your assistant's avatar and give it a unique name
- 🗣️ **Natural Conversations**: Speak naturally and get intelligent, context-aware responses
- 🔒 **Secure & Private**: JWT-based authentication keeps your data safe
- ⚡ **Lightning Fast**: Real-time processing with optimized performance
- 📱 **Responsive Design**: Works seamlessly across all devices


## ✨ Features

<div align="center">
  <img src="./assets/image2.jpg" width="90%" alt="Features Overview"/>
</div>

### 🔐 **Authentication System**
- ✅ Secure Sign Up & Sign In
- ✅ JWT-based token authentication
- ✅ Password encryption with bcrypt
- ✅ Session management

### 🧑‍🚀 **Virtual Assistant Customization**
- 🎭 Choose from multiple assistant avatars
- ✏️ Assign a custom name to your assistant
- 🎨 Personalized greeting messages
- 💾 Save preferences to your profile

### 🎤 **Voice Interaction**
- 🗣️ Ask questions using your voice
- 🎯 Real-time speech recognition
- 🌍 Multi-language support
- 🔇 Noise cancellation

### 🔊 **Voice Response**
- 🤖 Natural-sounding Text-to-Speech
- 🎵 Adjustable speech rate and pitch
- 🔈 High-quality audio output
- ⏯️ Playback controls

### 🧠 **AI Integration**
- 🚀 Powered by Google Gemini API
- 💡 Smart, contextual responses
- 📚 Knowledge across multiple domains
- 🔄 Continuous learning capabilities

### 🎨 **Modern UI/UX**
- 🌈 Animated gradients and transitions
- 📱 Fully responsive design
- 🌙 Dark mode support
- ♿ Accessibility features



## 🛠️ Tech Stack

<div align="center">

</div>

### 🎨 **Frontend**
```
⚛️  React.js - UI Framework
🎯  Context API - State Management
🎨  Tailwind CSS - Styling
🗣️  Web Speech API - Voice Recognition
🎤  SpeechSynthesis API - Text-to-Speech
```

### 🔧 **Backend**
```
🟢  Node.js - Runtime Environment
🚂  Express.js - Web Framework
🔐  JWT - Authentication
🔒  bcrypt - Password Hashing
```

### 💾 **Database**
```
🍃  MongoDB - NoSQL Database
📊  Mongoose - ODM
```

### 🤖 **AI & APIs**
```
🧠  Google Gemini API - AI Responses
🌐  REST API - Communication
```

<p align="center">
  
</p>

## ⚙️ Installation & Setup

### 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn
- Git

### 🚀 Quick Start

#### 1️⃣ **Clone the Repository**
```bash
git clone https://github.com/your-username/virtual-assistant.git
cd virtual-assistant
```

#### 2️⃣ **Backend Setup**
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=development
```

Start the backend server:
```bash
npm start
```

#### 3️⃣ **Frontend Setup**
```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:8000/api
```

Start the development server:
```bash
npm run dev
```

#### 4️⃣ **Access the Application**
Open your browser and navigate to:
```
http://localhost:5173
```

<p align="center">

</p>

## 🔑 Environment Variables

<div align="center">
  <img src="./assets/image5.png" width="60%" alt="Environment Setup"/>
</div>

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `8000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/assistant` |
| `JWT_SECRET` | Secret key for JWT | `your-super-secret-key-here` |
| `GEMINI_API_KEY` | Google Gemini API key | `AIza...` |
| `NODE_ENV` | Environment mode | `development` or `production` |

### Frontend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:8000/api` |

<p align="center">
 
</p>

## 🚀 How It Works

<div align="center">

</div>

### 📝 Step-by-Step Process

**1. 🔐 Authentication**
   - User registers with email and password
   - Credentials are securely stored with encryption
   - JWT token generated for session management

**2. 🎨 Customization**
   - User selects an avatar from the gallery
   - Names the virtual assistant
   - Settings are saved to user profile

**3. 🎤 Voice Input**
   - User clicks the microphone button
   - Browser's Speech Recognition API captures audio
   - Speech is converted to text in real-time

**4. 🧠 AI Processing**
   - Query is sent to the backend
   - Backend forwards to Google Gemini API
   - AI generates an intelligent response

**5. 🔊 Voice Output**
   - Response is converted to speech
   - Text-to-Speech API speaks the answer
   - User can replay or interrupt as needed

<p align="center">
 
</p>

## 📸 Screenshots

<div align="center">
  <img src="./assets/screenshot-1.png" width="45%" alt="Login Screen"/>
  <img src="./assets/screenshot-2.png" width="45%" alt="Dashboard"/>
  <br/>
  <img src="./assets/screenshot-3.png" width="45%" alt="Assistant Selection"/>
  <img src="./assets/screenshot-4.png" width="45%" alt="Voice Interaction"/>
</div>

<p align="center">
 
</p>

## 🎬 Demo

<div align="center">
  <img src="./assets/demo.gif" width="80%" alt="Live Demo"/>
  
  **[🎥 Watch Full Demo Video](https://your-demo-link.com)**
</div>

<p align="center">

</p>

## 📁 Project Structure

```
virtual-assistant/
├── 📂 backend/
│   ├── 📂 config/
│   ├── 📂 controllers/
│   ├── 📂 models/
│   ├── 📂 routes/
│   ├── 📂 middleware/
│   ├── 📄 server.js
│   └── 📄 .env
│
├── 📂 frontend/
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   ├── 📂 context/
│   │   ├── 📂 pages/
│   │   ├── 📂 assets/
│   │   ├── 📂 utils/
│   │   └── 📄 App.jsx
│   ├── 📄 package.json
│   └── 📄 .env
│
└── 📄 README.md
```

<p align="center">
 
</p>

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🎉 Open a Pull Request

<p align="center">

</p>

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<p align="center">
 
</p>

## 👨‍💻 Author

**Your Name**

- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [Your Name](https://linkedin.com/in/your-profile)
- Email: your.email@example.com

<p align="center">
 
</p>

## 🙏 Acknowledgments

- Google Gemini AI Team for the amazing API
- MongoDB team for the robust database
- React community for excellent documentation
- All contributors who help improve this project

<p align="center">

</p>

<div align="center">
  
  **Made with ❤️ and ☕ by developers, for developers**
  
  ⭐ **Star this repo if you found it helpful!** ⭐
  
</div>

<p align="center">
  
</p>
