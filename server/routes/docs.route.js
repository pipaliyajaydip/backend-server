import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { apiDocs } from '../docs/swagger.js';
 
const docsRouter = express.Router();

docsRouter.use('/', swaggerUi.serve, swaggerUi.setup(apiDocs));

export default docsRouter;
