import 'dotenv/config';
import 'reflect-metadata';
import { container } from 'tsyringe';

import bootstrap from '#/infrastructure/http/server.js';

import createContainer from './infrastructure/config/container.js';
import CriticalErrorsService from './infrastructure/services/CriticalErrorsService.js';

createContainer();

const criticalErrorsService = container.resolve(CriticalErrorsService);

process.on('uncaughtException', criticalErrorsService.handle);

process.on('unhandledRejection', criticalErrorsService.handle);

bootstrap();
