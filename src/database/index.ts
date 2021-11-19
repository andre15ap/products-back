import { MongoClient, Db, ObjectId, Double } from 'mongodb';

class Database {
  private static INSTANCE: Database;
  private database: Db;
  private client: MongoClient;

  private constructor() { }

  public static getInstance(): Database {
    if (!Database.INSTANCE) {
      Database.INSTANCE = new Database();
    }
    return Database.INSTANCE;
  }

  async connectDatabase() {
    this.client = new MongoClient(process.env.MONGODB_URI, { connectTimeoutMS: 5000 });
    const conn = await this.client.connect();
    const db = conn.db(process.env.DB_NAME);
    console.log('Database connected...');
    this.setDatabase(db);
  }

  setDatabase(db: Db) {
    this.database = db;
  }

  getDatabase() {
    return this.database;
  }

  async close() {
    return this.client.close();
  }

  getObjectIdByString(id: string) {
    return new ObjectId(id);
  }

  convertPriceToDouble(price: number) {
    return new Double(price);
  }
}

export { Database };
