import type { Router } from 'express';
import { container } from 'tsyringe';

import WorkLogController from '../http/controllers/WorkLogController.js';
import WorkTypeController from '../http/controllers/WorkTypeController.js';
import createWorkLogRoutes from '../http/routes/workLogRoutes.js';
import createWorkTypeRoutes from '../http/routes/workTypeRoutes.js';
import workLogValidations, {
  WORKLOG_VALIDATIONS_TOKEN,
} from '../http/validations/workLogValidations.js';
import { translator, type ITranslator } from '../services/i18n/i18n.js';
import LoggerService from '../services/LoggerService.js';

import config from './env.js';

import { CONFIG_TOKEN } from '#/application/interfaces/config/IConfig.js';
import type IWorkLogRepository from '#/application/interfaces/IWorkLogRepository.js';
import type IWorkTypeRepository from '#/application/interfaces/IWorkTypeRepository.js';
import type ILogger from '#/application/interfaces/logger/ILogger.js';
import WorkLog from '#/domain/entities/WorkLog.js';
import MeasurementUnit, { EnumMeasurementValue } from '#/domain/value-objects/MeasurementUnit.js';

export interface IAppRoute {
  readonly path: string;
  readonly router: Router;
}

class FakeWorkTypeRepository implements IWorkTypeRepository {
  async getAll() {
    return [
      { id: '1', name: 'Монтажные работы (Фейк)', createdAt: new Date(), updatedAt: new Date() },
      { id: '2', name: 'Монтажные работы (Фейк)', createdAt: new Date(), updatedAt: new Date() },
    ];
  }
  async getById() {
    return {
      id: '1',
      name: 'Монтажные работы (Фейк)',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
  async save() {}
  async delete() {}
}

class FakeWorkLogRepository implements IWorkLogRepository {
  async findById() {
    return {
      id: '1',
      date: new Date(),
      workTypeId: '1',
      volume: 1,
      unit: new MeasurementUnit(EnumMeasurementValue.KG),
      contractorId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
  async findByDateRange() {
    return [
      {
        id: '1',
        date: new Date(),
        workTypeId: '1',
        volume: 1,
        unit: new MeasurementUnit(EnumMeasurementValue.KG),
        contractorId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        date: new Date(),
        workTypeId: '1',
        volume: 1,
        unit: new MeasurementUnit(EnumMeasurementValue.KG),
        contractorId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }
  async save() {
    return new WorkLog({
      id: '1',
      date: new Date(),
      workTypeId: '1',
      volume: 1,
      unit: EnumMeasurementValue.KG,
      contractorId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  async delete() {}
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
  container.register('IWorkTypeRepository', {
    useClass: FakeWorkTypeRepository,
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
    useClass: FakeWorkTypeRepository,
  });
  container.register('IWorkLogRepository', {
    useClass: FakeWorkLogRepository,
  });
};

export default createContainer;
