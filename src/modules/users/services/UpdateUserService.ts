import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  public async execute({ id, name, email, password }: IRequest): Promise<User> {
    const user = await UsersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const userExists = await UsersRepository.findByEmail(email);

    if (userExists && email != user.email) {
      throw new AppError('There is already one user with this email.');
    }

    user.name = name;
    user.email = email;
    user.password = await hash(password, 8);

    await UsersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
