import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

class Database {
  private database: Db;

  constructor() {
    this.connectDatabase().then(() => console.log('db conected'));
  }

  async connectDatabase() {
    dotenv.config();
    const client: MongoClient = new MongoClient(process.env.DB_CONN as string);
    const conn = await client.connect();
    const db = conn.db(process.env.DB_NAME);
    this.setDatabase(db);
  }

  setDatabase(db: Db) {
    this.database = db;
  }

  getDatabase() {
    return this.database;
  }
}

export default new Database();
