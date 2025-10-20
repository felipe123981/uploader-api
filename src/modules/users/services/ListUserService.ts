import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';

class ListUserService {
  public async execute(): Promise<User[]> {
    const user = UsersRepository.find();

    return user;
  }
}

export default ListUserService;
