import { Router } from 'express';

import type WorkLogController from '../controllers/WorkLogController.js';
import type { IWorkLogValidations } from '../validations/workLogValidations.js';

const createWorkLogRoutes = (
  workLogController: WorkLogController,
  workLogValidations: IWorkLogValidations,
): Router => {
  const router = Router();
  router.get('/', workLogValidations.getWorkLogs, workLogController.getWorkLogs);
  router.get('/units', workLogController.getUnits);
  router.get('/:id', workLogValidations.getWorkLog, workLogController.getWorkLog);
  router.post('/', workLogValidations.createWorkLog, workLogController.createWorkLog);
  router.patch('/:id', workLogValidations.updateWorkLog, workLogController.updateWorkLog);
  router.delete('/', workLogValidations.deleteWorkLogs, workLogController.deleteWorkLogs);
  return router;
};

export default createWorkLogRoutes;
