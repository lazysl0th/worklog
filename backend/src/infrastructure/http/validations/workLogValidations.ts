import type { RequestHandler } from 'express';
import type { InjectionToken } from 'tsyringe';

import {
  getWorkLogsSchema,
  createWorkLogSchema,
  updateWorkLogSchema,
  deleteWorkLogSchema,
  getWorkLogSchema,
} from '#/application/dtos/WorkLogDTO.js';

import validate from '../middleware/validation.js';

export interface IWorkLogValidations {
  getWorkLogs: RequestHandler;
  getWorkLog: RequestHandler;
  createWorkLog: RequestHandler;
  updateWorkLog: RequestHandler;
  deleteWorkLogs: RequestHandler;
}

const workLogValidations: IWorkLogValidations = {
  getWorkLogs: validate(getWorkLogsSchema),
  getWorkLog: validate(getWorkLogSchema),
  createWorkLog: validate(createWorkLogSchema),
  updateWorkLog: validate(updateWorkLogSchema),
  deleteWorkLogs: validate(deleteWorkLogSchema),
};

export const WORKLOG_VALIDATIONS_TOKEN: InjectionToken<IWorkLogValidations> =
  Symbol('workLogValidations');

export default workLogValidations;
