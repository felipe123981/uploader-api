// Ex: src/shared/http/middlewares/errorHandler.ts
import { ErrorRequestHandler } from 'express';
import AppError from '@shared/errors/AppError';
import { env } from 'src/env'; // assumindo que você tem env.NODE_ENV

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // Se for um erro conhecido (AppError)
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  // Erros desconhecidos (500)
  if (env.NODE_ENV === 'production') {
    // ❌ NUNCA exiba detalhes internos em produção
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error.',
    });
  }

  // ✅ Em desenvolvimento, mostre detalhes para debug
  console.error('Erro não tratado:', error);
  return res.status(500).json({
    status: 'error',
    message: error.message,
    stack: error.stack, // apenas em dev!
  });
};

export default errorHandler;
