import { container } from 'tsyringe';

import { ConsoleLogger } from '../services/ConsoleLogger/ConsoleLogger.js';
import { translator, type ITranslator } from '../services/i18n/i18n.js';

import config from './env.js';

import { CONFIG_TOKEN } from '#/application/interfaces/config/IConfig.js';
import type ILogger from '#/application/interfaces/logger/ILogger.js';

const createContainer = () => {
  container.register(CONFIG_TOKEN, { useValue: config });
  container.register<ILogger>('ILogger', { useClass: ConsoleLogger });
  container.register<ITranslator>('ITranslator', { useValue: translator });
};

export default createContainer;
