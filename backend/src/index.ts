import 'reflect-metadata';
import { container } from 'tsyringe';

import createContainer from './infrastructure/config/container.js';
import CriticalErrorHandlers from './infrastructure/services/CriticalErrorsHandler/CriticalErrorsHandler.js';

import bootstrap from '#/infrastructure/http/server.js';

createContainer();

const criticalErrorsHandler = container.resolve(CriticalErrorHandlers);

process.on('uncaughtException', criticalErrorsHandler.handle);

process.on('unhandledRejection', criticalErrorsHandler.handle);

bootstrap();
