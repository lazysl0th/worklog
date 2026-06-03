import { inject, injectable } from 'tsyringe';

import type { ITranslator } from './i18n/i18n.js';

import type ILogger from '#/application/interfaces/ILogger.js';

@injectable()
export default class CriticalErrorsService {
  constructor(
    @inject('ITranslator') private i18n: ITranslator,
    @inject('ILogger') private logger: ILogger,
  ) {}

  handle = (err: Error): void => {
    this.logger.error({ err }, this.i18n.t('server.critical_error'));
    process.emit('SIGTERM');
  };
}
