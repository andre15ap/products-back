import { ProductRepository } from '../../repositories/products';
import { CreateProductUseCase } from './create-product-use-case';
import { CreateProductController } from './create-product-controller';

function createProductController(): CreateProductController {
  const productRepository = new ProductRepository();

  const createProductUseCase = new CreateProductUseCase(productRepository);

  const createProductController = new CreateProductController(createProductUseCase);

  return createProductController;
}

export default createProductController();