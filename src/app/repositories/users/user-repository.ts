import { User } from '../../models/user';
import { ICreateUserDTO, IUserRepository } from './interface';

import { Database } from '../../../database';
import { USER_COLLECTION } from '../../../database/collections';

class UserRepository implements IUserRepository {

  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  getCollection() {
    const database = this.db.getDatabase()
    return database.collection<User>(USER_COLLECTION);
  }

  async create({ name, email, password }: ICreateUserDTO): Promise<void> {
    const user = new User({ name, email, password });
    const collection = this.getCollection();
    await collection.insertOne(user)
  }

  async list(): Promise<User[]> {
    const collection = this.getCollection();
    const users = collection.find().toArray();
    return users;
  }

  async findByEmail(email: string): Promise<User> {
    const collection = this.getCollection();
    const foundUser = collection.findOne({ email });
    return foundUser;
  }

  async findById(id: string): Promise<User> {
    const collection = this.getCollection();
    const foundUser = collection.findOne({ id });
    return foundUser;
  }

  async remove(id: string): Promise<void> {
    const collection = this.getCollection();
    await collection.deleteOne({ id });
  }
}

export { UserRepository };