import type { RequestHandler } from 'express';

import { injectable, inject } from 'tsyringe';

import type {
  TCreateWorkLogDto,
  TDeleteWorkLogDto,
  TGetWorkLogDto,
  TGetWorkLogsDto,
  TUpdateWorkLogBody,
  TUpdateWorkLogParams,
} from '#/application/dtos/WorkLogDTO.js';
import type { DeleteResult } from '#/application/interfaces/IWorkTypeRepository.js';
import type WorkLog from '#/domain/entities/WorkLog.js';

import CreateWorkLog from '#/application/use-cases/WorkLog/CreateWorkLog.js';
import DeleteWorkLogs from '#/application/use-cases/WorkLog/DeleteWorkLogs.js';
import GetWorkLog from '#/application/use-cases/WorkLog/GetWorkLog.js';
import GetWorkLogs from '#/application/use-cases/WorkLog/GetWorkLogs.js';
import UpdateWorkLog from '#/application/use-cases/WorkLog/UpdateWorkLog.js';

import HttpStatusCode from '../contstants/httpStatusCode.js';

@injectable()
export default class WorkLogController {
  constructor(
    @inject(GetWorkLogs) private readonly getAll: GetWorkLogs,
    @inject(GetWorkLog) private readonly getById: GetWorkLog,
    @inject(CreateWorkLog) private readonly create: CreateWorkLog,
    @inject(UpdateWorkLog) private readonly update: UpdateWorkLog,
    @inject(DeleteWorkLogs) private readonly remove: DeleteWorkLogs,
  ) {}

  public getWorkLogs: RequestHandler<never, WorkLog[], never, TGetWorkLogsDto> = async (
    req,
    res,
  ): Promise<void> => {
    const { startDate, endDate, sortByDate } = req.query;
    const workLogs = await this.getAll.execute({ startDate, endDate, sortByDate });
    res.status(HttpStatusCode.Ok).json(workLogs);
  };

  public getWorkLog: RequestHandler<TGetWorkLogDto, WorkLog, never> = async (
    req,
    res,
  ): Promise<void> => {
    const { id } = req.params;
    const workLog = await this.getById.execute(id);
    res.status(HttpStatusCode.Ok).json(workLog);
  };

  public createWorkLog: RequestHandler<never, WorkLog, TCreateWorkLogDto> = async (
    req,
    res,
  ): Promise<void> => {
    const workLogDto = req.body;
    const workLog = await this.create.execute(workLogDto);
    res.status(HttpStatusCode.Created).json(workLog);
  };

  public updateWorkLog: RequestHandler<TUpdateWorkLogParams, WorkLog, TUpdateWorkLogBody> = async (
    req,
    res,
  ): Promise<void> => {
    const workLogDto = {
      ...req.params,
      ...req.body,
    };
    const workLog = await this.update.execute(workLogDto);
    res.status(HttpStatusCode.Ok).json(workLog);
  };

  public deleteWorkLogs: RequestHandler<never, DeleteResult, TDeleteWorkLogDto> = async (
    req,
    res,
  ): Promise<void> => {
    const ids = req.body.ids;
    const result = await this.remove.execute(ids);
    res.status(HttpStatusCode.NoContent).send(result);
  };
}
