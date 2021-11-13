import { ProductRepositoryInMemory } from "../../../repositories/products/in-memory"
import { CreateProductUseCase } from "../create-product-use-case";

import { IStorage } from '../../../../common/storage/interface'
import { AppError } from "../../../../errors/app-errors";

class MockStorageFile implements IStorage {
  async saveFile(filename: string) {
    return 'fake_url';
  }

  async deleteFile(url: string) {
    return;
  }
}

describe('Create Product', () => {
  let createProductUseCase: CreateProductUseCase;
  let productRepositoryInMemory: ProductRepositoryInMemory;
  let storageFile: MockStorageFile;

  beforeEach(() => {
    productRepositoryInMemory = new ProductRepositoryInMemory();
    storageFile = new MockStorageFile();
    createProductUseCase = new CreateProductUseCase(productRepositoryInMemory, storageFile);
  });

  const file: Express.Multer.File = {
    filename: 'fake_filename'
  } as any;

  const product = {
    name: 'product test',
    price: 15,
    description: 'fake description',
    file,
  };

  it('should be able to crate a product', async () => {

    jest.spyOn(storageFile, 'saveFile');

    await createProductUseCase.execute(product);

    const createdProduct = await productRepositoryInMemory.findByName(product.name);

    expect(createdProduct).toHaveProperty('id');
    expect(createdProduct.name).toBe('product test');
    expect(createdProduct.description).toBe('fake description');
    expect(createdProduct.price).toBe(15);
    expect(createdProduct.image).toBe('fake_url');

    expect(storageFile.saveFile).toHaveBeenCalled();
    expect(storageFile.saveFile).toHaveBeenCalledWith('fake_filename');
  });

  it('should not be able to create a product with a same name of an existing product', async () => {
    await productRepositoryInMemory.create(product);

    await expect(async () => {
      await createProductUseCase.execute(product);
    }).rejects.toBeInstanceOf(AppError);
  })
});
