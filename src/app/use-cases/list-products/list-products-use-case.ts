import { Product } from '../../models/product';
import { IProducRepository } from '../../repositories/products/interface';

class ListProductsUseCase {
  private productRepository: IProducRepository;

  constructor(productRepository: IProducRepository) {
    this.productRepository = productRepository;
  }

  async execute(): Promise<Product[]> {
    const products = await this.productRepository.list();
    return products;
  }
}

export { ListProductsUseCase };
