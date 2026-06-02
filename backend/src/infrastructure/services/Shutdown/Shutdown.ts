import { inject, singleton } from 'tsyringe';

import type { ITranslator } from '../i18n/i18n.js';

import type ILogger from '#/application/interfaces/logger/ILogger.js';

@singleton()
export default class ShutdownService {
  private isAvailable = true;

  constructor(
    @inject('ITranslator') private i18n: ITranslator,
    @inject('ILogger') private logger: ILogger,
  ) {}

  public get isAppAvailable(): boolean {
    return this.isAvailable;
  }

  public async stop(): Promise<void> {
    this.isAvailable = false;
    try {
      //TO DO: Здесь можно добавить логику для безопасного завершения работы приложения, например, закрытие соединений с базой данных, остановка очередей и т.д.
      this.logger.info(this.i18n.t('server.app_stop_safe'));
    } catch (err) {
      this.logger.error({ err }, this.i18n.t('server.app_stop_error'));
      throw err;
    }
  }
}
