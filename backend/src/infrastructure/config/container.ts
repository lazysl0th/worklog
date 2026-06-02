import { container } from 'tsyringe';

import { translator, type ITranslator } from '../services/i18n/i18n.js';
import LoggerService from '../services/LoggerService/LoggerService.js';

import config from './env.js';

import { CONFIG_TOKEN } from '#/application/interfaces/config/IConfig.js';
import type ILogger from '#/application/interfaces/logger/ILogger.js';

const createContainer = () => {
  container.register(CONFIG_TOKEN, { useValue: config });
  container.register<ILogger>('ILogger', { useClass: LoggerService });
  container.register<ITranslator>('ITranslator', { useValue: translator });
};

export default createContainer;
