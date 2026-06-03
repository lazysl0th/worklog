import type { Router } from 'express';
import { container } from 'tsyringe';

import WorkLogController from '../http/controllers/WorkLogController.js';
import WorkTypeController from '../http/controllers/WorkTypeController.js';
import createWorkLogRoutes from '../http/routes/workLogRoutes.js';
import createWorkTypeRoutes from '../http/routes/workTypeRoutes.js';
import workLogValidations, {
  WORKLOG_VALIDATIONS_TOKEN,
} from '../http/validations/workLogValidations.js';
import { PrismaWorkLogRepository } from '../persistence/repository/PrismaWorkLogRepository.js';
import { PrismaWorkTypeRepository } from '../persistence/repository/PrismaWorkTypeRepository.js';
import { translator, type ITranslator } from '../services/i18n/i18n.js';
import LoggerService from '../services/LoggerService.js';

import config from './env.js';

import { CONFIG_TOKEN } from '#/application/interfaces/IConfig.js';
import type ILogger from '#/application/interfaces/ILogger.js';

export interface IAppRoute {
  readonly path: string;
  readonly router: Router;
}

const createContainer = () => {
  container.register(CONFIG_TOKEN, { useValue: config });
  container.register<ILogger>('ILogger', { useClass: LoggerService });
  container.register<ITranslator>('ITranslator', { useValue: translator });
  container.register(WORKLOG_VALIDATIONS_TOKEN, { useValue: workLogValidations });
  container.register<IAppRoute>('IAppRoute', {
    useFactory: (controller) => {
      const routesController = controller.resolve(WorkTypeController);
      return {
        path: '/work-types',
        router: createWorkTypeRoutes(routesController),
      };
    },
  });
  container.register<IAppRoute>('IAppRoute', {
    useFactory: (controller) => {
      const routesController = controller.resolve(WorkLogController);
      const workLogValidations = controller.resolve(WORKLOG_VALIDATIONS_TOKEN);
      return {
        path: '/work-types',
        router: createWorkLogRoutes(routesController, workLogValidations),
      };
    },
  });
  container.register('IWorkTypeRepository', {
    useClass: PrismaWorkTypeRepository,
  });
  container.register('IWorkLogRepository', {
    useClass: PrismaWorkLogRepository,
  });
};

export default createContainer;
