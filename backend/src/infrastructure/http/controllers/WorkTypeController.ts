import type { RequestHandler } from 'express';

import { inject, injectable } from 'tsyringe';

import GetWorkTypes from '#/application/use-cases/WorkType/GetWorkTypes.js';

import HttpStatusCode from '../contstants/httpStatusCode.js';

@injectable()
export default class WorkTypeController {
  constructor(@inject(GetWorkTypes) private readonly getWorkTypes: GetWorkTypes) {}

  public getList: RequestHandler = async (_, res): Promise<void> => {
    const workType = await this.getWorkTypes.execute();
    res.status(HttpStatusCode.Ok).json(workType);
  };
}
