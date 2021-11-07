import Database from '../../database';
import { IProduct, PRODUCT_COLLECTION } from '../../database/collections/product';

class ProductService {
  convertToClient(product: IProduct) {
    return {
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
    }
  }

  getCollection() {
    const database = Database.getDatabase();
    return database.collection<IProduct>(PRODUCT_COLLECTION);
  }

  async create(product: IProduct) {
    const collection = this.getCollection();

    const price = Database.convertPriceToDouble(product.price as any);

    return collection.insertOne({ ...product, price });
  }

  async getAll() {
    const collection = this.getCollection();
    const products = await collection.find();
    return (await products.toArray()).map(this.convertToClient);
  }

  async remove(id: string) {
    const collection = this.getCollection();
    const objectId = Database.getObjectIdByString(id);
    return collection.deleteOne({ _id: objectId });
  }
}

export default new ProductService();
