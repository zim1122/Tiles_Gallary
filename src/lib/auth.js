import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const mongoUri = process.env.MONGO_DB_URI || process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error("MONGO_DB_URI is not defined in environment variables");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(mongoUri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(mongoUri);
  clientPromise = client.connect();
}

const connectedClient = await clientPromise;
const db = connectedClient.db();

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: { 
    enabled: true, 
  },
  database: mongodbAdapter(db, {
    client: connectedClient
  }),
});
