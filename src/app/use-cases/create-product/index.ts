import { ProductRepository } from '../../repositories/products/product-repository';
import { CreateProductUseCase } from './create-product-use-case';
import { CreateProductController } from './create-product-controller';
import { StorageFile } from '../../../common/storage/aws-storage';

function createProductController(): CreateProductController {
  const productRepository = new ProductRepository();
  const sotorageFile = new StorageFile();

  const createProductUseCase = new CreateProductUseCase(productRepository, sotorageFile);

  const createProductController = new CreateProductController(createProductUseCase);

  return createProductController;
}

export default createProductController();
