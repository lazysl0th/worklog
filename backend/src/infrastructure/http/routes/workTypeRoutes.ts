import { Router } from 'express';

import type WorkTypeController from '../controllers/WorkTypeController.js';

const createWorkTypeRoutes = (workTypeController: WorkTypeController): Router => {
  const router = Router();
  router.get('/', workTypeController.getList);
  return router;
};

export default createWorkTypeRoutes;
