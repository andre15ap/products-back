import { ProductRepositoryInMemory } from "../../../repositories/products/in-memory";
import { ListProductsUseCase } from "../list-products-use-case";

describe('List Products', () => {
  let listProductsUseCase: ListProductsUseCase;
  let productRepositoryInMemory: ProductRepositoryInMemory;

  beforeAll(() => {
    productRepositoryInMemory = new ProductRepositoryInMemory();
    listProductsUseCase = new ListProductsUseCase(productRepositoryInMemory);
  });

  it('should be able to list products', async () => {
    await productRepositoryInMemory.create({
      name: 'product_01',
      image: 'mock_image_01',
      price: 10,
    });
    await productRepositoryInMemory.create({
      name: 'product_02',
      image: 'mock_image_02',
      price: 15,
    });

    const products = await listProductsUseCase.execute();

    expect(products).toHaveLength(2);

    expect(products[0]).toHaveProperty('id');
    expect(products[0].name).toBe('product_01');
    expect(products[0].image).toBe('mock_image_01');
    expect(products[0].price).toBe(10);

    expect(products[1]).toHaveProperty('id');
    expect(products[1].name).toBe('product_02');
    expect(products[1].image).toBe('mock_image_02');
    expect(products[1].price).toBe(15);

  })
})