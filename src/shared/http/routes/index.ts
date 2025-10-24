import { Router } from 'express';
import usersRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import profileRouter from '@modules/users/routes/profile.routes';
import passwordRouter from '@modules/users/routes/password.routes';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello friend!' });
});

routes.use('/users', usersRouter);
routes.use('/auth', sessionsRouter);
routes.use('/profile', profileRouter);
routes.use('/password', passwordRouter);

export default routes;
