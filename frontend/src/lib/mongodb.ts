import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI; // Store this in .env.local
const MONGODB_DB = "investor_dashboard"; // Replace with your database name

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI in environment variables");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
}

export default clientPromise;
