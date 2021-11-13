import { IProducRepository } from '../../repositories/products/interface';
import { IStorage } from '../../../common/storage/interface';

class RemoveProductUseCase {
  private productRepository: IProducRepository;
  private storageFile: IStorage;

  constructor(productRepository: IProducRepository, storage: IStorage) {
    this.productRepository = productRepository;
    this.storageFile = storage;
  }

  async execute(id: string) {

    const product = await this.productRepository.findById(id);

    if (product && product.image) {
      await this.storageFile.deleteFile(product.image)
    }
    await this.productRepository.remove(id);
  }
}

export { RemoveProductUseCase };
