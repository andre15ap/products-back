import { UserRepositoryInMemory } from "../../../repositories/users/in-memory";
import { RemoveUserUseCase } from "../remove-user-use-case";


describe('Remove User', () => {
  let removeUserUseCase: RemoveUserUseCase;
  let userRepositoryInMemory: UserRepositoryInMemory;

  beforeAll(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    removeUserUseCase = new RemoveUserUseCase(userRepositoryInMemory);
  });

  it('should be able to remove an user', async () => {
    const user = {
      name: 'user_name',
      email: 'user@mail',
      password: 'fake_password',
    };

    await userRepositoryInMemory.create(user);

    const users = await userRepositoryInMemory.list();
    expect(users).toHaveLength(1);

    const id = users[0].id;

    await removeUserUseCase.execute(id);

    const usersAfter = await userRepositoryInMemory.list();
    expect(usersAfter).toHaveLength(0);
  });
});
