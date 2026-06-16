# 🎯 FanQuest: The Engagement Economy

![FanQuest Banner](https://via.placeholder.com/1200x400.png?text=FanQuest+-+Replace+Subscriptions+with+Action)

> **HACKHAZARDS '26 Submission**
> **Theme:** Media, Social & Interactive Platforms
> **Tracks Targeted:** Expo, Neo4j AuraDB, Render Workflows, Sarvam AI

## 🚨 The Problem: Subscription Fatigue
According to recent industry data, over 50% of Gen Z and Millennial audiences are canceling their media subscriptions due to rising costs. Consequently, tech creators are forced to put their most valuable content behind strict cash paywalls, effectively locking out 99% of their audience and only monetizing the wealthiest 1%. 

## 💡 The Solution: FanQuest
FanQuest is a mobile-first, gamified community platform that replaces the traditional *financial paywall* with an *engagement paywall*. We allow creators to host their communities where fans unlock premium content (courses, source code, VIP access) not by spending cash, but by earning **XP (Points)** through active community participation, peer-to-peer help, and brand sponsor interactions.

It is a closed-loop economy:
1. **Fans** trade their attention and helpfulness for premium access.
2. **Creators** monetize 100% of their audience through sponsored quests and automated community management.
3. **Brands** inject capital into the platform to acquire hyper-verified user interactions, bypassing traditional ad-blockers.

---

## 📱 Core Architecture & User Flows

FanQuest caters to three distinct user archetypes, each with a bespoke onboarding flow and dashboard experience.

### 🎮 1. FANS: The Engine
The Fan interface is built purely for dopamine, progression, and unlocking content. It mimics a gaming dashboard with a minimalist "White Calm" UI.

**Onboarding (Player Character Creation)**
*   **The Gateway:** Frictionless 1-click entry via Discord or Google.
*   **The Gamer Tag:** Claiming a unique identity within the FanQuest universe.
*   **Choose Your Factions:** Selecting 3 initial Creators/Games/Brands to generate the first Quest Board.
*   **The Dopamine Hit:** Instant +100 XP reward upon completing onboarding to establish the core loop.

**The Dashboard**
*   **Tab 1: The Quest Board:** A scrollable action feed with clear XP bounties, highlighted by a prominent "Hero Quest" card.
*   **Tab 2: The Vault:** A visual gallery of locked premium content. Users can spend XP to shatter the blur-effect and hit the neon "Claim" button.
*   **Tab 3: The Arena:** Global and Creator-specific leaderboards, highlighting immediate rivals to trigger competitive psychology.
*   **Tab 4: Player Card:** A digital trophy case displaying total XP, earned badges, and an activity ledger.

### 🎨 2. CREATORS: The Quest Givers
The Creator interface is a "Command Center" built for dropping tasks, measuring engagement, and identifying top fans.

**Onboarding (Establishing the Base Camp)**
*   **Social Verification:** Authenticating via YouTube/Twitch/X to sync metrics and prove identity.
*   **Setting the Vault:** Dropping a "Lead Magnet" (e.g., unlisted video or discount code) into their Vault.
*   **Generating the Core Quest:** Defining the initial action fans must take to unlock the lead magnet.
*   **The Summoning Link:** Generating a custom short-link to drop into their existing communities to start farming XP immediately.

**The Dashboard**
*   **Tab 1: Command Center:** Live metrics tracking Total Fan XP generated and active quest completion rates.
*   **Tab 2: The Forge:** An input interface to paste target URLs, set the XP bounty slider, and link the quest to specific Vault rewards.
*   **Tab 3: Audience CRM:** A ranked breakdown of top fans, tools for manual XP airdrops, and churn warnings for inactive users.
*   **Tab 4: Public Storefront:** The outward-facing profile showing active campaigns to visiting fans.

### 🏢 3. BRANDS: The Sponsors
The Brand interface is a high-end financial terminal built purely for ROI, budget allocation, and analytics.

**Onboarding (Booting the Terminal)**
*   **Corporate Identity:** Professional signup capturing company details and brand assets.
*   **Defining the Target:** Selecting specific demographic or creator tags for targeted bounties.
*   **Setting the Bounties:** Choosing the core KPI (e.g., App Downloads, Social Shares).
*   **Funding the Treasury:** Connecting a payment gateway to deposit the campaign budget.

**The Dashboard**
*   **Tab 1: Campaign Manager:** Real-time tracking of active bounties, budget burn rate, and Customer Acquisition Cost (CAC).
*   **Tab 2: The Marketplace:** A board to post public bounties to trending creators.
*   **Tab 3: The Analytics Engine:** Conversion graphs, audience overlap data, and automated PDF report generation.

---

## 🛠️ Technical Architecture

FanQuest is built on a highly modular, decoupled architecture to ensure zero merge conflicts and maximum scalability.

### Frontend: The Expo Shell
*   **Framework:** Expo (React Native) for cross-platform deployment.
*   **Styling:** NativeWind (TailwindCSS) for precise, minimalist UI implementation.
*   **State Management:** Zustand for lightweight global wallet state.

### Backend: The Node Engine
*   **Runtime:** Node.js with Express.js (TypeScript).
*   **Workflows:** **Render Workflows** is utilized for the "Automated Quest Validator." When a user submits a complex task (like a GitHub PR link), a background Render job extracts the data, validates it using **Sarvam AI**, and securely executes the database mutation without freezing the main Express server.

### Database: The Neo4j Graph
*   **Engine:** Neo4j AuraDB.
*   **Why Graph?:** Gamification and social networks are fundamentally relationship problems. FanQuest abandons traditional NoSQL in favor of a Cypher-driven graph schema `(Fan)-[:COMPLETED]->(Quest)`. 
*   Point balances are calculated dynamically via complex Cypher traversals, preventing static value spoofing.

---

## 🚀 Local Installation & Setup

### Prerequisites
*   Node.js (v18+)
*   Expo CLI
*   A free Neo4j AuraDB Instance

### 1. Database Setup
Ensure your AuraDB instance is running. Run the initialization Cypher script located in `/db/init.cypher` to seed the mock Creator, Quests, and Premium Content.

### 2. Backend Setup
```bash
# Clone the repository
git clone https://github.com/your-username/fanquest-api.git
cd fanquest-api

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Add your NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD, and RENDER/SARVAM keys

# Start the development server
npm run dev
```