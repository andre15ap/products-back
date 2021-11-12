import { IProducRepository } from '../../repositories/products/interface';

import S3Storage from '../../../common/s3';

class RemoveProductUseCase {
  private productRepository: IProducRepository;

  constructor(productRepository: IProducRepository) {
    this.productRepository = productRepository;
  }

  async execute(id: string) {
    const s3Storage = new S3Storage();

    const product = await this.productRepository.findById(id);

    if (product.image) {
      await s3Storage.deleteFile(product.image)
    }
    await this.productRepository.remove(id);
  }
}

export { RemoveProductUseCase };
