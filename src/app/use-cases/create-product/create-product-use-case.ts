import { AppError } from '../../../errors/app-errors';
import { IProducRepository } from '../../repositories/products/interface';

import { IStorage } from '../../../common/storage/interface';

interface IRequest {
  name: string,
  description: string,
  price: number,
  file: Express.Multer.File,
}

class CreateProductUseCase {
  private productRepository: IProducRepository;
  private storageFile: IStorage;

  constructor(productRepository: IProducRepository, storage: IStorage) {
    this.productRepository = productRepository;
    this.storageFile = storage;
  }

  async execute({ name, description, price, file }: IRequest) {
    const productAlreadyExists = await this.productRepository.findByName(name);

    if (productAlreadyExists) {
      throw new AppError('Product already exists');
    }

    const image = await this.storageFile.saveFile(file.filename);

    await this.productRepository.create({ name, description, image, price });
  }
}

export { CreateProductUseCase };
