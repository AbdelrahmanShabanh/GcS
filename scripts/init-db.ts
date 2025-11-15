import { config } from "dotenv";
import { seedDatabase } from "../lib/seed";

// Load environment variables from .env.local
config({ path: ".env.local" });

async function initDatabase() {
  try {
    console.log("Initializing database...");
    await seedDatabase();
    console.log("Database initialization completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Database initialization failed:", error);
    process.exit(1);
  }
}

initDatabase();
