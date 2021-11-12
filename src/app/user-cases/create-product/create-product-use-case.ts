import { AppError } from '../../../errors/app-errors';
import { IProducRepository } from '../../repositories/products/interface';

import S3Storage from '../../../common/s3';

interface IRequest {
  name: string,
  description: string,
  price: number,
  file: Express.Multer.File,
}

class CreateProductUseCase {
  private productRepository: IProducRepository;

  constructor(productRepository: IProducRepository) {
    this.productRepository = productRepository;
  }

  async execute({ name, description, price, file }: IRequest) {
    const productAlreadyExists = await this.productRepository.findByName(name);

    if (productAlreadyExists) {
      throw new AppError('Product already exists');
    }

    const s3Storage = new S3Storage();

    const image = await s3Storage.saveFile(file.filename);

    await this.productRepository.create({ name, description, image, price });
  }
}

export { CreateProductUseCase };
