import { ProductRepositoryInMemory } from "../../../repositories/products/in-memory";
import { RemoveProductUseCase } from "../remove-product-use-case";

import { IStorage } from '../../../../common/storage/interface'

class MockStorageFile implements IStorage {
  async saveFile(filename: string) {
    return 'fake_url';
  }

  async deleteFile(url: string) {
    return;
  }
}

describe('Remove Product', () => {
  let removeProductUseCase: RemoveProductUseCase;
  let productRepositoryInMemory: ProductRepositoryInMemory;

  beforeAll(() => {
    productRepositoryInMemory = new ProductRepositoryInMemory();
    const storageFile = new MockStorageFile();
    removeProductUseCase = new RemoveProductUseCase(productRepositoryInMemory, storageFile);
  });

  it('should be able to remove a procuct', async () => {
    const product = {
      name: 'product_name',
      image: 'fake_image',
      price: 10,
    };

    await productRepositoryInMemory.create(product);

    const products = await productRepositoryInMemory.list();
    expect(products).toHaveLength(1);

    const id = products[0].id;

    await removeProductUseCase.execute(id);

    const productsAfter = await productRepositoryInMemory.list();
    expect(productsAfter).toHaveLength(0);
  });
});
