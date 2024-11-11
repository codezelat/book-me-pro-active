import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

let client;
let clientPromise;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
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

<<<<<<< HEAD
// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error(
//     "Please define the MONGODB_URI environment variable inside .env.local"
//   );
// }

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function dbConnect() {
//   if (cached.conn) {
//     return cached.conn;
//   }
//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     };
//     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//       console.log("Db connected");
//       return mongoose;
//     });
//   }
//   try {
//     cached.conn = await cached.promise;
//   } catch (e) {
//     cached.promise = null;
//     throw e;
//   }

//   return cached.conn;
// }

// export default dbConnect;
=======


// import mongoose from 'mongoose'

// const MONGODB_URI = process.env.MONGODB_URI

// if (!MONGODB_URI) {
//     throw new Error(
//         'Please define the MONGODB_URI environment variable inside .env.local',
//     )
// }

// let cached = global.mongoose

// if (!cached) {
//     cached = global.mongoose = { conn: null, promise: null }
// }

// async function dbConnect() {
//     if (cached.conn) {
//         return cached.conn
//     }
//     if (!cached.promise) {
//         const opts = {
//             bufferCommands: false,
//         }
//         cached.promise = mongoose.connect(DATABASE_URL, opts).then(mongoose => {
//             console.log('Db connected')
//             return mongoose
//         })
//     }
//     try {
//         cached.conn = await cached.promise
//     } catch (e) {
//         cached.promise = null
//         throw e
//     }

//     return cached.conn
// }

// export default dbConnect

>>>>>>> 2c6a1f057e65d67757333cddd4ef9b64536ad133
