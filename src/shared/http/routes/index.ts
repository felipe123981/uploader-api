import { Router } from 'express';
import usersRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello friend!' });
});

routes.use('/users', usersRouter);
routes.use('/auth', sessionsRouter)

export default routes;
