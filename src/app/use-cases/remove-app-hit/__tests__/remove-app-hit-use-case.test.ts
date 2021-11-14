import { AppHitRepositoryInMemory } from "../../../repositories/app-hit/in-memory";
import { RemoveAppHitUseCase } from "../remove-app-hit-use-case";

describe('Remove AppHit', () => {
  let removeAppHitUseCase: RemoveAppHitUseCase;
  let appHitRepositoryInMemory: AppHitRepositoryInMemory;

  beforeAll(() => {
    appHitRepositoryInMemory = new AppHitRepositoryInMemory();
    removeAppHitUseCase = new RemoveAppHitUseCase(appHitRepositoryInMemory);
  });

  it('should be able to remove an AppHit', async () => {
    const appHit = {
      namespace: 'namespace test',
      key: 'key test',
      value: 10,
    };

    await appHitRepositoryInMemory.create(appHit);

    const appHits = await appHitRepositoryInMemory.list();
    expect(appHits).toHaveLength(1);

    const id = appHits[0].id;

    await removeAppHitUseCase.execute(id);

    const appHitsAfter = await appHitRepositoryInMemory.list();
    expect(appHitsAfter).toHaveLength(0);
  });
});
