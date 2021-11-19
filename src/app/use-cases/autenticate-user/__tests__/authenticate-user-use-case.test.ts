import { AppError } from "../../../../errors/app-errors";
import { UserRepositoryInMemory } from "../../../repositories/users/in-memory";
import { ICreateUserDTO } from "../../../repositories/users/interface";
import { CreateUserUseCase } from "../../create-user/create-user-use-case";
import { AuthenticateUserUserUseCase } from "../authenticate-user-use-case";

describe('Authenticate User', () => {

  let userRepositoryInMemory: UserRepositoryInMemory;
  let authenticateUserUseCase: AuthenticateUserUserUseCase;
  let createUserUseCase: CreateUserUseCase;

  beforeAll(() => {
    process.env.SECRET_TOKEN = 'mock_secret';
  });

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUserUseCase(userRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  const user: ICreateUserDTO = {
    name: 'User test',
    email: 'test@mail',
    password: '123',
  }

  it('shold be able to authenticate an user', async () => {
    await createUserUseCase.execute(user);

    const auth = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(auth).toHaveProperty('token');
    expect(auth).toHaveProperty('id');
  });

  it('shold not be able to authenticate a nonexistent user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'fake@email',
        password: '123',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('shold not be able to authenticate with incorrect password', async () => {
    await createUserUseCase.execute(user);

    await expect(async () => {
      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrect',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
