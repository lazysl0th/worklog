import http from 'http';

import express from 'express';
import { container } from 'tsyringe';

import ServerErrorsHandler from '../services/ServerErrorsHandler/ServerErrorsHandler.js';
import ServerListenHandler from '../services/ServerListenHandler/ServerListenHandler.js';

import { CONFIG_TOKEN } from '#/application/interfaces/config/IConfig.js';

const bootstrap = async () => {
  const config = container.resolve(CONFIG_TOKEN);
  const serverErrorsHandler = container.resolve(ServerErrorsHandler);
  const serverListenHandler = container.resolve(ServerListenHandler);
  const app = express();
  app.get('/', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'pong' });
  });
  const httpServer = http.createServer(app);
  httpServer.on('error', (err) => serverErrorsHandler.handle(err, httpServer));
  httpServer.listen(config.PORT, serverListenHandler.handle);
};

export default bootstrap;
