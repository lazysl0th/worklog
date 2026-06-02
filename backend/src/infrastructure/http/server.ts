import http from 'http';

import { createTerminus } from '@godaddy/terminus';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { container } from 'tsyringe';

import type { IAppRoute } from '../config/container.js';
import CorsService from '../services/CorsService/CorsService.js';
import ServerErrorsService from '../services/ServerErrorsService/ServerErrorsService.js';
import ServerListenService from '../services/ServerListenService/ServerListenService.js';
import TerminusService from '../services/TerminusService/TerminusService.js';

import limiter from './middleware/limiter.js';

import { CONFIG_TOKEN } from '#/application/interfaces/config/IConfig.js';

const bootstrap = async () => {
  const config = container.resolve(CONFIG_TOKEN);
  const serverErrorsService = container.resolve(ServerErrorsService);
  const serverListenService = container.resolve(ServerListenService);
  const corsService = container.resolve(CorsService);
  const routes = container.resolveAll<IAppRoute>('IAppRoute');

  const app = express();
  app.use(helmet());
  app.use(cors(corsService.options));
  app.use(limiter);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  routes.forEach((route) => app.use(route.path, route.router));

  app.get('/', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'pong' });
  });

  const httpServer = http.createServer(app);
  const terminusService = container.resolve(TerminusService);
  createTerminus(httpServer, terminusService.options());

  httpServer.on('error', (err) => serverErrorsService.handle(err, httpServer));
  httpServer.listen(config.PORT, serverListenService.handle);
};

export default bootstrap;
