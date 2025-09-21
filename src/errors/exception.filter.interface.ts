import { NextFunction, Request, Response } from 'express';
import { LoggerService } from '../logger/logger.service';

export interface IExceptionFilter {
  catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}
