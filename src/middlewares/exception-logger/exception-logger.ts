import { NextFunction, Request, Response } from 'express';
import HttpException from './HttpException';
import { logger } from '../../utils/logger';
 
export function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';


  response
    .status(status)
    .json({
      status,
      message,
    });

    logger.log('error',"Failed Request ", response);

}