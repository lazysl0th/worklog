import 'reflect-metadata';
import { Decimal } from '@prisma/client/runtime/client';
import { randomUUID, type UUID } from 'crypto';
import express from 'express';
import { container } from 'tsyringe';
import { afterAll, beforeAll, beforeEach, vi } from 'vitest';
import { mockDeep, mockReset, type DeepMockProxy } from 'vitest-mock-extended';
import { mock } from 'vitest-mock-extended';

import type { TGetWorkLogsDto } from '#/application/dtos/WorkLogDTO.js';
import type IWorkLogRepository from '#/application/interfaces/IWorkLogRepository.js';
import type IWorkTypeRepository from '#/application/interfaces/IWorkTypeRepository.js';
import type { PrismaClient } from '#/infrastructure/persistence/prisma/generated/client.js';
import type PrismaService from '#/infrastructure/services/PrismaService.js';

import WorkLog from '#/domain/entities/WorkLog.js';
import WorkType from '#/domain/entities/WorkType.js';
import { EnumMeasurementValue } from '#/domain/value-objects/MeasurementUnit.js';
import WorkLogController from '#/infrastructure/http/controllers/WorkLogController.js';
import WorkTypeController from '#/infrastructure/http/controllers/WorkTypeController.js';
import errorsHandler from '#/infrastructure/http/middleware/errorsHandler.js';
import createWorkLogRoutes from '#/infrastructure/http/routes/workLogRoutes.js';
import createWorkTypeRoutes from '#/infrastructure/http/routes/workTypeRoutes.js';
import workLogValidations from '#/infrastructure/http/validations/workLogValidations.js';
import { MeasurementUnit } from '#/infrastructure/persistence/prisma/generated/client.js';
import { PrismaWorkLogRepository } from '#/infrastructure/persistence/repository/PrismaWorkLogRepository.js';
import { PrismaWorkTypeRepository } from '#/infrastructure/persistence/repository/PrismaWorkTypeRepository.js';

const prismaMock: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();

let workLogId: UUID;
let workTypeId: UUID;
let contractorId: UUID;

let app: express.Express;
let mockWorkLogRepository: ReturnType<typeof mock<IWorkLogRepository>>;
let mockWorkTypeRepository: ReturnType<typeof mock<IWorkTypeRepository>>;

const setupApp = (
  mockWorkLogRepository: ReturnType<typeof mock<IWorkLogRepository>>,
  mockWorkTypeRepository: ReturnType<typeof mock<IWorkTypeRepository>>,
): express.Express => {
  container.registerInstance('IWorkLogRepository', mockWorkLogRepository);
  container.registerInstance('IWorkTypeRepository', mockWorkTypeRepository);
  const workLogController = container.resolve(WorkLogController);
  const workTypeController = container.resolve(WorkTypeController);

  const app = express();
  app.use(express.json());

  app.use('/work-logs', createWorkLogRoutes(workLogController, workLogValidations));
  app.use('/work-types', createWorkTypeRoutes(workTypeController));

  app.use(errorsHandler);

  return app;
};

const mockPrismaService = mock<PrismaService>();
Object.defineProperty(mockPrismaService, 'client', {
  get: () => prismaMock,
});

const prismaWorkLogRepository = new PrismaWorkLogRepository(mockPrismaService);

const prismaWorkTypeRepository = new PrismaWorkTypeRepository(mockPrismaService);

const createMockWorkLog = () =>
  new WorkLog({
    id: workLogId,
    date: new Date('2026-06-03'),
    workTypeId: workTypeId,
    volume: 15.0,
    unit: EnumMeasurementValue.M3,
    contractorId: contractorId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

const createMockDbWorkLogRecord = () => ({
  id: workLogId,
  date: new Date('2026-06-05'),
  workTypeId: workTypeId,
  volume: new Decimal(15.0),
  unit: MeasurementUnit.M3,
  contractorId: contractorId,
  createdAt: new Date(),
  updatedAt: new Date(),
});

const createMockWorkType = () =>
  new WorkType({
    id: workTypeId,
    name: 'Разработка грунта',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

const createDbMockWorkTypeRecord = () => ({
  id: workTypeId,
  name: 'Разработка грунта',
  createdAt: new Date(),
  updatedAt: new Date(),
});

const filters: TGetWorkLogsDto = {
  startDate: new Date('2026-06-01'),
  endDate: new Date('2026-06-05'),
  sortByDate: 'asc' as const,
};

beforeAll(() => {
  vi.spyOn(console, 'log').mockImplementation(() => {});
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  vi.restoreAllMocks();
});

beforeEach(() => {
  container.clearInstances();
  workLogId = randomUUID();
  workTypeId = randomUUID();
  contractorId = randomUUID();
  mockReset(prismaMock);
  mockWorkLogRepository = mock<IWorkLogRepository>();
  mockWorkTypeRepository = mock<IWorkTypeRepository>();
  app = setupApp(mockWorkLogRepository, mockWorkTypeRepository);
});

export {
  prismaMock,
  workLogId,
  workTypeId,
  contractorId,
  app,
  mockWorkLogRepository,
  mockWorkTypeRepository,
  mockPrismaService,
  prismaWorkLogRepository,
  prismaWorkTypeRepository,
  createMockWorkLog,
  createMockWorkType,
  createMockDbWorkLogRecord,
  createDbMockWorkTypeRecord,
  filters,
};
