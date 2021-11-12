import { ProductRepository } from '../../repositories/products';
import { RemoveProductUseCase } from './remove-product-use-case';
import { RemoveProductController } from './remove-product-controller';

function removeProductController(): RemoveProductController {
  const productRepository = new ProductRepository();

  const removeProductUseCase = new RemoveProductUseCase(productRepository);

  const removeProductController = new RemoveProductController(removeProductUseCase);

  return removeProductController;
}

export default removeProductController();