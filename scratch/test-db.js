const { MongoClient } = require('mongodb');
const fs = require('fs');

function loadEnv() {
  try {
    const content = fs.readFileSync('.env.local', 'utf8');
    content.split('\n').forEach(line => {
      const part = line.split('=');
      if (part.length >= 2) {
        const key = part[0].trim();
        const value = part.slice(1).join('=').trim();
        process.env[key] = value;
      }
    });
  } catch (e) {
    console.log('Could not read .env.local');
  }
}

loadEnv();

async function testConnection() {
  const uri = process.env.MONGO_DB_URI || process.env.MONGODB_URI;
  console.log('Testing connection to:', uri ? uri.replace(/:([^@]+)@/, ':****@') : 'undefined');
  
  if (!uri) {
    console.error('Error: MONGODB_URI or MONGO_DB_URI is not defined in .env.local');
    process.exit(1);
  }

  const client = new MongoClient(uri);
  try {
    console.log('Connecting...');
    await client.connect();
    console.log('Successfully connected to MongoDB!');
    const db = client.db();
    console.log('Database name:', db.databaseName);
  } catch (err) {
    console.error('Connection failed:', err.message);
    console.error('Error name:', err.name);
  } finally {
    await client.close();
  }
}

testConnection();
