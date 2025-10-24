import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post(
  '/login',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

export default sessionsRouter;
