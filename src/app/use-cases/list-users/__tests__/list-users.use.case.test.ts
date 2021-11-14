import { UserRepositoryInMemory } from "../../../repositories/users/in-memory";
import { ListUsersUseCase } from "../list-users-use-case";

describe('List Users', () => {
  let listUsersUseCase: ListUsersUseCase;
  let userRepositoryInMemory: UserRepositoryInMemory;

  beforeAll(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    listUsersUseCase = new ListUsersUseCase(userRepositoryInMemory);
  });

  it('should be able to list users', async () => {
    await userRepositoryInMemory.create({
      name: 'user_01',
      email: 'user_01@mail',
      password: 'fake_password_01',
    });
    await userRepositoryInMemory.create({
      name: 'user_02',
      email: 'user_02@mail',
      password: 'fake_password_02',
    });

    const users = await listUsersUseCase.execute();

    expect(users).toHaveLength(2);

    expect(users[0]).toHaveProperty('id');
    expect(users[0]).not.toHaveProperty('password');
    expect(users[0].name).toBe('user_01');
    expect(users[0].email).toBe('user_01@mail');

    expect(users[1]).toHaveProperty('id');
    expect(users[1]).not.toHaveProperty('password');
    expect(users[1].name).toBe('user_02');
    expect(users[1].email).toBe('user_02@mail');
  })
})