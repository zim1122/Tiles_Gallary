import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const baseURL =
  process.env.BETTER_AUTH_URL ||
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "http://localhost:3000";

let authInstance;
let mongoClientInstance;

function getMongoClient() {
  if (mongoClientInstance) return mongoClientInstance;

  const mongoUri = process.env.MONGO_DB_URI || process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error(
      "MongoDB URI missing. Set MONGO_DB_URI (or MONGODB_URI) in your environment."
    );
  }

  const useInsecureTls = process.env.MONGO_TLS_INSECURE === "true";
  const isLocalMongo =
    mongoUri.includes("localhost") || mongoUri.includes("127.0.0.1");

  mongoClientInstance = new MongoClient(mongoUri, {
    serverSelectionTimeoutMS: 10000,
    ...(isLocalMongo ? { directConnection: true } : {}),
    ...(useInsecureTls
      ? { tlsAllowInvalidCertificates: true, tlsAllowInvalidHostnames: true }
      : {}),
  });

  return mongoClientInstance;
}

export function getAuth() {
  if (authInstance) return authInstance;

  const client = getMongoClient();
  const db = client.db();

  authInstance = betterAuth({
    baseURL: baseURL.replace(/\/$/, ""),
    emailAndPassword: {
      enabled: true,
    },
    database: mongodbAdapter(db, {
      client,
    }),
  });

  return authInstance;
}
