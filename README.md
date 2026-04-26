# SahaayNet 🤝
**Connecting Communities, Empowering Change**

SahaayNet is a next-generation, AI-powered community assistance platform designed to bridge the gap between people in need and those who wish to help. By integrating real-time resource matching, multilingual support, and a modern "glassmorphism" interface, SahaayNet transforms community service into a seamless, impactful digital experience.

---

## 🚀 The Problem
In many communities, humanitarian aid and volunteer efforts are often **fragmented**. 
- **Information Gap**: People don't know where to donate blood or find educational support.
- **Coordination Issues**: NGOs and volunteers struggle to match resources with local needs efficiently.
- **Language Barriers**: Critical aid platforms are often not accessible to non-English speakers.
- **Trust Deficit**: There is a lack of transparency in tracking community impact.

## 💡 The Solution: SahaayNet
SahaayNet provides a **unified ecosystem** where every act of kindness is tracked, every need is heard, and every resource is optimized. 

### Core Features
- **🤖 AI Matching Engine**: A FastAPI-powered backend that intelligently matches resource requests with nearby providers based on urgency and location.
- **🎙️ Voice Assistant**: A multilingual AI companion that helps users navigate the platform and request aid using natural voice commands.
- **📊 Impact Dashboard**: Real-time visualization of community contributions, total participations, and verified submissions.
- **🌍 Multilingual Reach**: Built-in support for multiple languages to ensure inclusivity across diverse demographic groups.
- **📍 Live Aid Map**: (Planned) Visualizing hotspots of needs and available resources in real-time.

---

## 🛠️ Modular Functionality
SahaayNet is built with specialized modules to address specific community needs:

1. **Resources**: Request or donate physical items (food, clothes, tools).
2. **Volunteer**: Browse and commit to local community service tasks.
3. **Blood Aid**: A dedicated bridge for urgent blood donation requirements.
4. **Education**: Peer-to-peer knowledge sharing and educational resource distribution.
5. **Animal Aid**: Specialized support for street animals and local shelters.
6. **Paryavaran (Environment)**: Tracking and organizing sustainability and green initiatives.
7. **Trust & Safety**: Connecting users with verified local NGOs.
8. **Muskan**: Focused initiatives for child welfare and spreading positivity.

---

## 💻 Tech Stack
- **Frontend**: React + Vite (Modern Glassmorphism UI, Lucide Icons, Framer Motion)
- **Backend**: Node.js + Express (API Management, User Participation Tracking)
- **AI Layer**: Python + FastAPI (Resource Matching Logic, AI Analysis)
- **Orchestration**: Concurrently (Runs Frontend, Backend, and AI servers simultaneously)

---

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- [Python](https://www.python.org/) (v3.9+)

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/AshuNimbalkar-02/SahaayNet.git
   cd SahaayNet/SahaayNet
   ```

2. **Install Dependencies**:
   ```bash
   # Install root dependencies
   npm install

   # Install Frontend dependencies
   cd frontend && npm install && cd ..

   # Install Backend dependencies
   cd backend && npm install && cd ..

   # Setup Python Environment (Recommended)
   pip install fastapi uvicorn pydantic
   ```

### Running the Project
From the root `SahaayNet/SahaayNet` directory:
```bash
npm run dev
```
*This will start the React frontend, Express backend, and FastAPI AI server in parallel.*

---

## 🛡️ Vision & Mission
**Vision**: To create a world where no cry for help goes unheard and no opportunity to help is wasted.
**Mission**: To leverage cutting-edge AI and human-centric design to facilitate local aid and foster global empathy.

---
© 2026 SahaayNet Team. Built with ❤️ for the community.
