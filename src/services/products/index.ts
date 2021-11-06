import Database from '../../database';
import {
  IProduct,
  PRODUCT_COLLECTION,
  convertPriceToDouble,
  getObjectIdByString,
} from '../../database/collections';

class ProductService {
  convertToClient(product: IProduct) {
    return {
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
    }
  }
  async create(product: IProduct) {
    const database = Database.getDatabase();
    const productCollection = database.collection<IProduct>(PRODUCT_COLLECTION);

    const price = convertPriceToDouble(product.price as any);

    return productCollection.insertOne({ ...product, price });
  }

  async getAll() {
    const database = Database.getDatabase();
    const productCollection = database.collection<IProduct>(PRODUCT_COLLECTION);
    const products = await productCollection.find();
    return (await products.toArray()).map(this.convertToClient);
  }

  async remove(id: string) {
    const database = Database.getDatabase();
    const productCollection = database.collection<IProduct>(PRODUCT_COLLECTION);
    const objectId = getObjectIdByString(id);
    return productCollection.deleteOne({ _id: objectId });
  }
}

export default new ProductService();
