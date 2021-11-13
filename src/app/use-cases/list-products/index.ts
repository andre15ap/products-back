import { ProductRepository } from '../../repositories/products/product-repository';
import { ListProductsUseCase } from './list-products-use-case';
import { ListProductsController } from './list-products-controller';

function listProductsController(): ListProductsController {
  const productRepository = new ProductRepository();

  const listProductsUseCase = new ListProductsUseCase(productRepository);

  const listProductsController = new ListProductsController(listProductsUseCase);

  return listProductsController;
}

export default listProductsController();