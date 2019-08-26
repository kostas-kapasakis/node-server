import express = require("express");
import { logger } from "../utils/logger";

export const requestsInterceptor = (request: express.Request, response: express.Response, next)  => {
    logger.log('info',`${request.method} ${request.path}`);
    next();
  }