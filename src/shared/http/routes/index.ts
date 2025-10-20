import { Router } from 'express';
import usersRouter from '@modules/users/routes/users.routes';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello friend!' });
});

routes.use('/users', usersRouter);

export default routes;
