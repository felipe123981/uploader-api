// src/modules/users/services/CreateUserService.ts
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository'; // importa o objeto
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    // ✅ Usa diretamente o objeto exportado — sem getCustomRepository!
    const nameExists = await UsersRepository.findByName(name);
    const emailExists = await UsersRepository.findByEmail(email);

    if (nameExists) {
      throw new AppError('There is already one other user with this name.');
    }

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = await UsersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return UsersRepository.save(user);
  }
}

export default CreateUserService;
