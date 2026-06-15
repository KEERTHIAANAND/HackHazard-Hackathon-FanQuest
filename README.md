# 🎯 FanQuest: The Engagement Economy

![FanQuest Banner](https://via.placeholder.com/1200x400.png?text=FanQuest+-+Replace+Subscriptions+with+Action)

> **HACKHAZARDS '26 Submission**
> **Theme:** Media, Social & Interactive Platforms
> **Tracks Targeted:** Expo, Neo4j AuraDB, Render Workflows, Sarvam AI

## 🚨 The Problem: Subscription Fatigue
According to recent industry data, over 50% of Gen Z and Millennial audiences are canceling their media subscriptions due to rising costs. Consequently, tech creators are forced to put their most valuable content behind strict cash paywalls, effectively locking out 99% of their audience and only monetizing the wealthiest 1%. 

## 💡 The Solution: FanQuest
FanQuest is a mobile-first, gamified community platform that replaces the traditional *financial paywall* with an *engagement paywall*. We allow creators to host their communities where fans unlock premium content (courses, source code, VIP access) not by spending cash, but by earning **Points** through active community participation, peer-to-peer help, and brand sponsor interactions.

It is a closed-loop economy:
1. **Fans** trade their attention and helpfulness for premium access.
2. **Creators** monetize 100% of their audience through sponsored quests and automated community management.
3. **Brands** inject capital into the platform to acquire hyper-verified user interactions, bypassing traditional ad-blockers.

---

## 📱 Core Features & User Flows

### 1. The Fan Experience (Mobile First)
* **The Minimalist UI:** A stark, "White Calm" interface designed to keep cognitive load low and focus entirely on content.
* **The Quest Dashboard:** Users complete actionable tasks (e.g., answering a coding question, reviewing a PR, engaging with a sponsor) to earn points.
* **The Unlock Protocol:** Points are dynamically calculated and spent to shatter the blur-effect on premium creator videos.

### 2. The Creator Studio (In-App Toggle)
* Creators can seamlessly switch their mobile view to "Studio Mode."
* They can upload content, set point-based paywalls, and generate custom Quests for their audience right from their device.

### 3. The Brand Marketplace (B2B Matchmaking)
* Brands fund "Sponsored Quests" (e.g., "Sign up for our Cloud API for 1,000 Points").
* Guaranteed ROI for sponsors, and massive revenue generation for creators without taxing the users.

---

## 🛠️ Technical Architecture

FanQuest is built on a highly modular, decoupled architecture to ensure zero merge conflicts and maximum scalability.

### Frontend: The Expo Shell
* **Framework:** Expo (React Native) for cross-platform deployment.
* **Styling:** NativeWind (TailwindCSS) for precise, minimalist UI implementation.
* **State Management:** Zustand for lightweight global wallet state.

### Backend: The Node Engine
* **Runtime:** Node.js with Express.js (TypeScript).
* **Workflows:** **Render Workflows** is utilized for the "Automated Quest Validator." When a user submits a complex task (like a GitHub PR link), a background Render job extracts the data, validates it using **Sarvam AI**, and securely executes the database mutation without freezing the main Express server.

### Database: The Neo4j Graph
* **Engine:** Neo4j AuraDB.
* **Why Graph?:** Gamification and social networks are fundamentally relationship problems. FanQuest abandons traditional NoSQL in favor of a Cypher-driven graph schema `(Fan)-[:COMPLETED]->(Quest)`. 
* Point balances are calculated dynamically via complex Cypher traversals, preventing static value spoofing.

---

## 🚀 Local Installation & Setup

### Prerequisites
* Node.js (v18+)
* Expo CLI
* A free Neo4j AuraDB Instance

### 1. Database Setup
Ensure your AuraDB instance is running. Run the initialization Cypher script located in `/db/init.cypher` to seed the mock Creator, Quests, and Premium Content.

### 2. Backend Setup
```bash
# Clone the repository
git clone [https://github.com/your-username/fanquest-api.git](https://github.com/your-username/fanquest-api.git)
cd fanquest-api

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Add your NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD, and RENDER/SARVAM keys

# Start the development server
npm run dev