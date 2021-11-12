import { IProducRepository } from '../../repositories/products/interface';

class RemoveProductUseCase {
  private productRepository: IProducRepository;

  constructor(productRepository: IProducRepository) {
    this.productRepository = productRepository;
  }

  async execute(id: string) {
    await this.productRepository.remove(id);
  }
}

export { RemoveProductUseCase };
