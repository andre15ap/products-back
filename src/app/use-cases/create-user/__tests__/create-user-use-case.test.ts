import { AppError } from "../../../../errors/app-errors";
import { UserRepositoryInMemory } from "../../../repositories/users/in-memory";
import { CreateUserUseCase } from "../create-user-use-case";

describe('Create User', () => {
  let userRepositoryInMemory: UserRepositoryInMemory;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  })

  const user = {
    name: 'User Test',
    email: 'user@mail',
    password: '123',
  };

  it('should be able to create an user', async () => {
    await createUserUseCase.execute(user);

    const createdUser = await userRepositoryInMemory.findByEmail('user@mail');

    expect(createdUser).toHaveProperty('id');
    expect(createdUser.name).toBe('User Test');
    expect(createdUser.email).toBe('user@mail');
    expect(createdUser.password).not.toBe(user.password);
  });

  it('should not be able to create an user with a existing email', async () => {
    await userRepositoryInMemory.create(user);

    await expect(async () => {
      await createUserUseCase.execute(user);
    }).rejects.toBeInstanceOf(AppError);
  });
});
