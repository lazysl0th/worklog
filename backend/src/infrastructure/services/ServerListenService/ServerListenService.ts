import { inject, injectable } from 'tsyringe';

import type { ITranslator } from '../i18n/i18n.js';

import { CONFIG_TOKEN, type TPort } from '#/application/interfaces/config/IConfig.js';
import type ILogger from '#/application/interfaces/logger/ILogger.js';

@injectable()
export default class ServerListenService {
  constructor(
    @inject('ITranslator') private i18n: ITranslator,
    @inject(CONFIG_TOKEN) private config: TPort,
    @inject('ILogger') private logger: ILogger,
  ) {}

  handle = (): void =>
    this.logger.info(this.i18n.t('server.server_running', { port: this.config.PORT }));
}
