// /Lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client;
let clientPromise;

if (!uri) {
    throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === 'development') {
    // In development mode, we want to keep the same client between hot reloads.
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri);
    clientPromise = client.connect();
}

// Export a function to use the connected client
export default async function connectToDatabase() {
    const client = await clientPromise;
    const db = client.db("your-database-name");
    return { db, client };
}
