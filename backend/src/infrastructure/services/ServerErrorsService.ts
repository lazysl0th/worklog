import type { Server } from 'http';

import { inject, injectable } from 'tsyringe';

import type ILogger from '#/application/interfaces/ILogger.js';

import { CONFIG_TOKEN, type TPort } from '#/application/interfaces/IConfig.js';

import type { ITranslator } from './i18n/i18n.js';

@injectable()
export default class ServerErrorsService {
  constructor(
    @inject('ITranslator') private i18n: ITranslator,
    @inject(CONFIG_TOKEN) private config: TPort,
    @inject('ILogger') private logger: ILogger,
  ) {}

  handle = (error: NodeJS.ErrnoException, server: Server): void => {
    if (error.code === 'EADDRINUSE') {
      this.logger.error(
        { port: this.config.PORT, error },
        this.i18n.t('server.port_busy', { port: this.config.PORT }),
      );
    } else {
      this.logger.error({ error }, this.i18n.t('server.startup_error'));
    }
    process.exitCode = 1;
    server.close();
  };
}
