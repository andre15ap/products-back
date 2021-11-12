import { Product } from "../../models/product";
import { ICreateProductDTO, IProducRepository } from "./interface";

import { Database } from '../../../database';
import { PRODUCT_COLLECTION } from '../../../database/collections'

class ProductRepository implements IProducRepository {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  getCollection() {
    const database = this.db.getDatabase()
    return database.collection<Product>(PRODUCT_COLLECTION);
  }

  async create({ name, description, image, price }: ICreateProductDTO): Promise<void> {
    const product = new Product({ name, description, image, price });
    const collection = this.getCollection();
    await collection.insertOne(product);
  }

  async findByName(name: string): Promise<Product> {
    const collection = this.getCollection();
    const foundProdut = await collection.findOne({ name });
    return foundProdut;
  }

  async findById(id: string): Promise<Product> {
    const collection = this.getCollection();
    const foundProdut = await collection.findOne({ id });
    return foundProdut;
  }

  async list(): Promise<Product[]> {
    const collection = this.getCollection();
    const products = await collection.find().toArray();
    return products;
  }

  async remove(id: string) {
    const collection = this.getCollection();
    await collection.deleteOne({ id });
  }
}

export { ProductRepository };