import { Router } from 'express';
import usersRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import profileRouter from '@modules/users/routes/profile.routes';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello friend!' });
});

routes.use('/users', usersRouter);
routes.use('/auth', sessionsRouter);
routes.use('/profile', profileRouter);

export default routes;
