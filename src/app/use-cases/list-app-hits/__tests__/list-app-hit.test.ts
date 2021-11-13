import { AppHitRepositoryInMemory } from "../../../repositories/app-hit/in-memory";
import { ListAppHitUseCase } from "../list-app-hits-use-case";

describe('Create AppHit', () => {
  let listAppHitUseCase: ListAppHitUseCase;
  let appHitRepositoryInMemory: AppHitRepositoryInMemory;

  beforeAll(() => {
    appHitRepositoryInMemory = new AppHitRepositoryInMemory();
    listAppHitUseCase = new ListAppHitUseCase(appHitRepositoryInMemory);
  });

  it('should be able to create a new AppHit', async () => {
    const appHit = {
      namespace: 'namespace test',
      key: 'key test',
      value: 10,
    };

    await appHitRepositoryInMemory.create(appHit);

    const appHits = await listAppHitUseCase.execute();

    expect(appHits).toHaveLength(1);

    expect(appHits[0]).toHaveProperty('id');
    expect(appHits[0].namespace).toBe('namespace test');
    expect(appHits[0].key).toBe('key test');
    expect(appHits[0].value).toBe(10);
  })
})