// userTokensRepository.ts
import { Repository } from 'typeorm';
import UserToken from '../entities/UserToken';
import { AppDataSource } from '@shared/typeorm';

class UserTokensRepository {
  private readonly repository: Repository<UserToken>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserToken);
  }

  async findByToken(token: string): Promise<UserToken | null> {
    return this.repository.findOneBy({ token });
  }

  async generate(user_id: string): Promise<UserToken> {
    const userToken = this.repository.create({ user_id });
    return this.repository.save(userToken); // ✅ Agora salva de verdade!
  }
}

export default new UserTokensRepository();
