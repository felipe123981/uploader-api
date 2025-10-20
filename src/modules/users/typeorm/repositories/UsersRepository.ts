// src/modules/users/repositories/UsersRepository.ts
import { AppDataSource } from '@shared/typeorm/index' // ajuste o caminho conforme seu projeto
import User from '../entities/User';

// Obtenha o repositório base do TypeORM
const userRepository = AppDataSource.getRepository(User);

// Exporte um objeto com métodos customizados
export const UsersRepository = {
  async findById(id: string): Promise<User | null> {
    return userRepository.findOne({ where: { id } });
  },

  async findByName(name: string): Promise<User | null> {
    return userRepository.findOne({ where: { name } });
  },

  async findByEmail(email: string): Promise<User | null> {
    return userRepository.findOne({ where: { email } });
  },

  // Você também pode adicionar create, save, etc., se quiser
  async create(user: Partial<User>): Promise<User> {
    const newUser = userRepository.create(user);
    return userRepository.save(newUser);
  },
  async save(user: User): Promise<User> {
    return userRepository.save(user);
  },
  async remove(user: User): Promise<User> {
    return userRepository.remove(user);
  },
  async find(): Promise<User[]> {
    return userRepository.find();
  },
};
