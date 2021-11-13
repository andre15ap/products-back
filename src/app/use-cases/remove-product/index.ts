import { ProductRepository } from '../../repositories/products/product-repository';
import { RemoveProductUseCase } from './remove-product-use-case';
import { RemoveProductController } from './remove-product-controller';
import { StorageFile } from '../../../common/storage/aws-storage';

function removeProductController(): RemoveProductController {
  const productRepository = new ProductRepository();
  const storageFile = new StorageFile();

  const removeProductUseCase = new RemoveProductUseCase(productRepository, storageFile);

  const removeProductController = new RemoveProductController(removeProductUseCase);

  return removeProductController;
}

export default removeProductController();