import { DataSource } from 'typeorm';
import User from '@modules/users/typeorm/entities/User';
import { env } from 'src/env';
import UserToken from '@modules/users/typeorm/entities/UserToken';

export const AppDataSource = new DataSource({
  type: env.DB_TYPE,
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  entities: [User, UserToken],
  migrations: ['./src/shared/typeorm/migrations/*.ts'],
  synchronize: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
