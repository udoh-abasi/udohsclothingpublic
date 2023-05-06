import { MongoClient } from "mongodb";

let db;

async function connectToDb() {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  db = client.db("country-state-cities");
  console.log("Connected to DB");
}

export { db, connectToDb };
