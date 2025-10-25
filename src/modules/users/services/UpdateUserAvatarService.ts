import AppError from '@shared/errors/AppError';
import path from 'path';
import fs from 'fs';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import uploadConfig from '@config/upload';
import { getFileExtension } from '@config/utils';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await UsersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (
        userAvatarFileExists &&
        (getFileExtension(avatarFilename) == 'png' ||
          getFileExtension(avatarFilename) == 'jpg' ||
          getFileExtension(avatarFilename) == 'jpeg' ||
          getFileExtension(avatarFilename) == 'webp')
      ) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await UsersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
