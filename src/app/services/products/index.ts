// import Database from '../../../database';
// import { IProduct, PRODUCT_COLLECTION } from '../../../database/collections/product';

// import S3Storage from '../../../common/s3';
import { ICreateProductDTO, IProducRepository } from '../../repositories/products/interface';

class ProductService {
  private productRepository: IProducRepository;

  constructor(productRepository: IProducRepository) {
    this.productRepository = productRepository;
  }

  create({ name, description, image, price }: ICreateProductDTO): void {
    const productAlreadyExists = this.productRepository.findByName(name);

    if (productAlreadyExists) {
      throw new Error('Product already exists');
    }
    this.productRepository.create({ name, description, image, price });
  }
  // convertToClient(product: IProduct) {
  //   return {
  //     id: product._id,
  //     name: product.name,
  //     description: product.description,
  //     price: product.price,
  //     image: product.image,
  //   }
  // }

  // getCollection() {
  //   const database = Database.getDatabase();
  //   return database.collection<IProduct>(PRODUCT_COLLECTION);
  // }

  // async create(product: IProduct, file: Express.Multer.File) {
  //   const collection = this.getCollection();
  //   const s3Storage = new S3Storage();

  //   const price = Database.convertPriceToDouble(product.price as any);

  //   const image = await s3Storage.saveFile(file.filename);

  //   return collection.insertOne({ ...product, price, image, filename: file.filename });
  // }

  // async getAll() {
  //   const collection = this.getCollection();
  //   const products = await collection.find();
  //   return (await products.toArray()).map(this.convertToClient);
  // }

  // async remove(id: string) {
  //   const collection = this.getCollection();
  //   const s3Storage = new S3Storage();

  //   const objectId = Database.getObjectIdByString(id);
  //   const product = await collection.findOneAndDelete({ _id: objectId });

  //   const { filename } = product?.value;
  //   if (filename) {
  //     return s3Storage.deleteFile(filename);
  //   }
  // }
}

export { ProductService };
