import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import { instanceToInstance } from 'class-transformer';
import AppError from '@shared/errors/AppError'; // opcional, mas recomendado

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    // ✅ Validação: arquivo foi enviado?
    if (!request.file) {
      throw new AppError('No avatar file provided.', 400);
    }

    const updateAvatar = new UpdateUserAvatarService();

    // ✅ Aguarde a execução assíncrona
    const user = await updateAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename, // não precisa de "as string" se validado
    });

    return response.json(instanceToInstance(user));
  }
}
