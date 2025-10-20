import 'reflect-metadata';
//import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { env } from 'process';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
    },
  },
  apis: ['./src/modules/**/routes/*.ts'],
};
const swaggerSpec = swaggerJSDoc(options);

const app = express();

app.use(cors());
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(routes);

app.listen(3333, () => {
  console.log(`Server running on port ${env.PORT}! 🏆`)
      console.log('API docs available at GET /docs 📚')
});
