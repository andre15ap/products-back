import { MongoClient, Db, ObjectId, Double } from 'mongodb';

class Database {
  private static INSTANCE: Database;
  private database: Db;

  constructor() {
    this.connectDatabase().then(() => console.log('db conected'));
  }

  public static getInstance(): Database {
    if (!Database.INSTANCE) {
      Database.INSTANCE = new Database();
    }
    return Database.INSTANCE;
  }

  async connectDatabase() {
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

  getObjectIdByString(id: string) {
    return new ObjectId(id);
  }

  convertPriceToDouble(price: number) {
    return new Double(price);
  }
}

export { Database };
