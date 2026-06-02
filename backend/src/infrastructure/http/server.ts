import http from 'http';

import { createTerminus } from '@godaddy/terminus';
import express from 'express';
import { container } from 'tsyringe';

import ServerErrorsHandler from '../services/ServerErrorsHandler/ServerErrorsHandler.js';
import ServerListenHandler from '../services/ServerListenHandler/ServerListenHandler.js';
import ShutdownService from '../services/Shutdown/Shutdown.js';
import TerminusService from '../services/Terminus/Terminus.js';

import { CONFIG_TOKEN } from '#/application/interfaces/config/IConfig.js';

const bootstrap = async () => {
  const config = container.resolve(CONFIG_TOKEN);
  const serverErrorsHandler = container.resolve(ServerErrorsHandler);
  const serverListenHandler = container.resolve(ServerListenHandler);
  const app = express();
  app.get('/', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'pong' });
  });

  app.get('/test/kill', (req, res) => {
    const shutdownService = container.resolve(ShutdownService);
    shutdownService.stop();
    res.send('Приложение переведено в статус DOWN');
  });
  const httpServer = http.createServer(app);
  const terminusService = container.resolve(TerminusService);
  createTerminus(httpServer, terminusService.options());

  httpServer.on('error', (err) => serverErrorsHandler.handle(err, httpServer));
  httpServer.listen(config.PORT, serverListenHandler.handle);
};

export default bootstrap;
