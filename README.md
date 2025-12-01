**# Fnatics-project-Sun Nov 30 05:00:19 IST 2025
**🚀 Fnatics – AI-Powered DSA Learning Platform

Fnatics is an AI-driven DSA learning assistant that helps students track progress, understand weak/strong topics, view analytics, and get personalized recommendations — all powered by Firebase + React.

Built during the 24-Hour Hackathon at Vedam School of Technology by Team Fnatics.

⭐ Features
🔐 Authentication

Secure Firebase Authentication

Student-specific profiles

Demo multiple user accounts

📊 Dashboard & Insights

Topic mastery graph (Arrays, DP, Trees, Graphs, Recursion, Bitmasking)

Daily streak + total solved

Activity line graph

Recommended questions

Personalized suggestions

🧠 AI Features

Detects weak vs. strong topics

Suggests topic improvement paths

Difficulty-aware question recommendations

Performance trend analysis

🏆 Leaderboard

Ranks students by total solved, streak, and consistency

Real-time Firestore updates

📝 DSA Questions Module

Topic-wise question sets

Mark as complete (auto-updates Firestore)

Direct links to LeetCode questions

Dynamic difficulty based on performance

🛠️ Tech Stack

React + Vite

Firebase Authentication

Firestore Database

TailwindCSS + ShadCN UI

Recharts

Vercel (Deployment)

📁 Project Structure
dsa-portal/
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── hooks/
│   ├── utils/
│   ├── firebase-config.js
│   └── App.jsx
├── public/
├── package.json
├── vite.config.js
└── README.md

🔧 Setup Instructions
1️⃣ Clone the repository
git clone https://github.com/aaradhychinche-alt/Fnatics-project-.git
cd Fnatics-project-/dsa-portal

2️⃣ Install dependencies
npm install

3️⃣ Add environment variables

Create a .env file:

VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_id
VITE_FIREBASE_APP_ID=your_id
VITE_FIREBASE_MEASUREMENT_ID=your_id

4️⃣ Start development server
npm run dev

5️⃣ Build for production
npm run build

🗄️ Firestore Collections
🔹 users/

Stores student properties:

Field	Description
name	Student name
email	Login email
streak	Daily streak
totalSolved	Number of solved DSA problems
weakTopics	Lower-mastery topics
strongTopics	Higher-mastery topics
dsaProgress	Percent mastery of each topic
performanceHistory	Activity graph data
📌 Live Demo

Paste your link here:

👉 Live Website:
https://fnatics-project.vercel.app/

👉 GitHub Repo:
https://github.com/aaradhychinche-alt/Fnatics-project-

👥 Team Fnatics
Member	Role
Aaradhy “Keshav” Chinche	Fullstack Dev (Frontend + Backend)
Dikshita	UI/UX Designer
Abhi Jain	Frontend Dev
Krishiv Mahajan	Frontend Dev
Agrima	Tester & Presenter
🎯 Future Improvements

More advanced AI analytics

Teacher dashboard

Weekly contests

Gamification (XP, badges)

Auto-generated performance insights
