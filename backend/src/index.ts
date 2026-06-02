import 'dotenv/config';
import 'reflect-metadata';
import { container } from 'tsyringe';

import createContainer from './infrastructure/config/container.js';
import CriticalErrorsService from './infrastructure/services/CriticalErrorsService/CriticalErrorsService.js';

import bootstrap from '#/infrastructure/http/server.js';

createContainer();

const criticalErrorsService = container.resolve(CriticalErrorsService);

process.on('uncaughtException', criticalErrorsService.handle);

process.on('unhandledRejection', criticalErrorsService.handle);

bootstrap();
