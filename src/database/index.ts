import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

let database: Db;

export async function connectDatabase() {
  dotenv.config();
  const client: MongoClient = new MongoClient(process.env.DB_CONN as string);
  const conn = await client.connect();
  database = conn.db(process.env.DB_NAME);
}

export function getDatabase() {
  return database;
}
