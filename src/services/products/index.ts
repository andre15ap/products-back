import Database from '../../database';
import { IProduct, PRODUCT_COLLECTION } from '../../database/collections/product';

import S3Storage from '../../config/s3';

class ProductService {
  convertToClient(product: IProduct) {
    return {
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
    }
  }

  getCollection() {
    const database = Database.getDatabase();
    return database.collection<IProduct>(PRODUCT_COLLECTION);
  }

  async create(product: IProduct, file: Express.Multer.File) {
    const collection = this.getCollection();
    const s3Storage = new S3Storage();


    const price = Database.convertPriceToDouble(product.price as any);

    const image = await s3Storage.saveFile(file.filename);

    return collection.insertOne({ ...product, price, image });
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
