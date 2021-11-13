import { AppHitRepositoryInMemory } from "../../../repositories/app-hit/in-memory";
import { CreateAppHitUseCase } from "../create-app-hit-use-case";

describe('Create AppHit', () => {
  let createAppHitUseCase: CreateAppHitUseCase;
  let appHitRepositoryInMemory: AppHitRepositoryInMemory;

  beforeAll(() => {
    appHitRepositoryInMemory = new AppHitRepositoryInMemory();
    createAppHitUseCase = new CreateAppHitUseCase(appHitRepositoryInMemory);
  });

  it('should be able to create a new AppHit', async () => {
    const appHit = {
      namespace: 'namespace test',
      key: 'key test',
      value: 10,
    };

    await createAppHitUseCase.execute(appHit);

    const appHits = await appHitRepositoryInMemory.list();

    expect(appHits[0]).toHaveProperty('id');
    expect(appHits[0].namespace).toBe('namespace test');
    expect(appHits[0].key).toBe('key test');
    expect(appHits[0].value).toBe(10);
  })
})