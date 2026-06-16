// FanQuest - Neo4j AuraDB Initialization Script
// This script sets up the Constraints and Initial Nodes for the Engagement Economy

// 1. Create Constraints (Ensures uniqueness and speeds up lookups)
CREATE CONSTRAINT unique_fan_id IF NOT EXISTS FOR (f:Fan) REQUIRE f.id IS UNIQUE;
CREATE CONSTRAINT unique_creator_id IF NOT EXISTS FOR (c:Creator) REQUIRE c.id IS UNIQUE;
CREATE CONSTRAINT unique_quest_id IF NOT EXISTS FOR (q:Quest) REQUIRE q.id IS UNIQUE;
CREATE CONSTRAINT unique_reward_id IF NOT EXISTS FOR (r:Reward) REQUIRE r.id IS UNIQUE;

// 2. Initialize Core Nodes (The Foundation)
// Creators
MERGE (c1:Creator {id: "creator_vercel", name: "Vercel", type: "Sponsor"})
MERGE (c2:Creator {id: "creator_primeagen", name: "The Primeagen", type: "Creator"})
MERGE (c3:Creator {id: "creator_fireship", name: "Fireship", type: "Creator"})

// Quests
MERGE (q1:Quest {id: "quest_pr", title: "Submit Valid PR", xp_reward: 5000, type: "Code"})
MERGE (q2:Quest {id: "quest_discord", title: "Join Discord", xp_reward: 100, type: "Social"})
MERGE (q3:Quest {id: "quest_video", title: "Watch Devlog", xp_reward: 50, type: "Content"})

// Rewards (The Vault)
MERGE (r1:Reward {id: "reward_vip_code", title: "VIP Source Code", xp_cost: 5000})
MERGE (r2:Reward {id: "reward_course", title: "React Course P1", xp_cost: 1000})

// 3. Establish Relationships
// Creators Own Quests
MERGE (c1)-[:SPONSORS]->(q1)
MERGE (c2)-[:SPONSORS]->(q2)
MERGE (c3)-[:SPONSORS]->(q3)

// Creators Own Rewards
MERGE (c1)-[:PROVIDES]->(r1)
MERGE (c3)-[:PROVIDES]->(r2)

// (Fans will dynamically create :COMPLETED and :UNLOCKED relationships during runtime)
