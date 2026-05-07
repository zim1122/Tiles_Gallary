import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const mongoUri = process.env.MONGO_DB_URI || process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error("MONGO_DB_URI is not defined in environment variables");
}

let client;
let clientPromise;
const useInsecureTls = process.env.MONGO_TLS_INSECURE === "true";
const isLocalMongo =
  mongoUri.includes("localhost") || mongoUri.includes("127.0.0.1");

const mongoClientOptions = {
  serverSelectionTimeoutMS: 10000,
  ...(isLocalMongo ? { directConnection: true } : {}),
  ...(useInsecureTls
    ? { tlsAllowInvalidCertificates: true, tlsAllowInvalidHostnames: true }
    : {}),
};

if (process.env.NODE_ENV === "development") {
  if (!globalThis._mongoClientPromise) {
    client = new MongoClient(mongoUri, mongoClientOptions);
    globalThis._mongoClientPromise = client.connect();
  }
  clientPromise = globalThis._mongoClientPromise;
} else {
  client = new MongoClient(mongoUri, mongoClientOptions);
  clientPromise = client.connect();
}

let connectedClient;
try {
  connectedClient = await clientPromise;
} catch (error) {
  console.error("MongoDB connection failed:", error);
  throw new Error(
    "Failed to connect to MongoDB. If you use Atlas, whitelist your current IP and verify the connection string. If you use a self-signed/local TLS cert, set MONGO_TLS_INSECURE=true in .env.local for development."
  );
}
const db = connectedClient.db();
const baseURL =
  process.env.BETTER_AUTH_URL ||
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "http://localhost:3000";

export const auth = betterAuth({
  baseURL: baseURL.replace(/\/$/, ""),
  emailAndPassword: { 
    enabled: true, 
  },
  database: mongodbAdapter(db, {
    client: connectedClient
  }),
});
