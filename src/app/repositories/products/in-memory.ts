import { Product } from '../../models/product';
import { IProducRepository, ICreateProductDTO } from './interface';

class ProductRepositoryInMemory implements IProducRepository {
  products: Product[] = [];

  async findByName(name: string) {
    return this.products.find(user => user.name === name);
  }

  async findById(id: string) {
    return this.products.find(user => user.id === id);
  }

  async create({ name, description, image, price }: ICreateProductDTO) {
    const user = new Product({ name, description, image, price });
    this.products.push(user);
  }

  async list() {
    return this.products;
  }

  async remove(id: string) {
    this.products = this.products.filter(user => user.id !== id);
  }
}

export { ProductRepositoryInMemory };
