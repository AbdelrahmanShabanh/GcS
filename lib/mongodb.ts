import { MongoClient, Db } from "mongodb";

// Load environment variables if not already loaded
if (!process.env.MONGODB_URI && typeof window === "undefined") {
  try {
    require("dotenv").config({ path: ".env.local" });
  } catch (e) {
    // dotenv not available, continue
  }
}

if (!process.env.MONGODB_URI) {
  if (process.env.NODE_ENV === "development") {
    throw new Error("Please add your MongoDB URI to .env.local");
  }
  // During build time, we'll use a placeholder
  console.warn("MongoDB URI not found. Using placeholder for build.");
}

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/gcschool";
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

export const getDatabase = async (): Promise<Db> => {
  const client = await clientPromise;
  return client.db("gcschool");
};
