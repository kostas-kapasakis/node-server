import { ICustomExpressServer } from './server';
import { Server } from "@overnightjs/core";
import * as express from "express";
import * as fs from 'fs';
import * as https from 'https';
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as cors from 'cors';
import * as forceSSl from 'express-force-ssl';

import { errorMiddleware } from './middlewares/exception-logger/exception-logger';
import * as controllers from './controllers/';
import { requestsInterceptor } from "./middlewares/requests-interceptor";
import * as winstonLogger from "./utils/logger";

export interface ICustomExpressServer extends Server{
    start(port: number): void;
}

export class CustomServer extends Server implements ICustomExpressServer {
  private readonly SERVER_STARTED = "Example server started on port: ";
  public mongoUrl: string = "mongodb://localhost:27017/Crmdb";
  public baseDir = __dirname;

  private readonly httpOptions = {
    key: fs.readFileSync("./config/key.pem"),
    cert: fs.readFileSync("./config/cert.pem")
  };

  constructor() {
    super(process.env.NODE_ENV === 'development');
    this.initializeMiddlewares();
    this.config();
    this.mongoSetup();
    this.setupControllers();
  }

  private setupControllers(): void {
    const controllerInstances = [];
    for (const name of Object.keys(controllers)) {
        const controller = (controllers as any)[name];
        if (typeof controller === 'function') {
            controllerInstances.push(new controller());
        }
    }
    super.addControllers(controllerInstances);
}

  private async mongoSetup(): Promise<void> {
    try {
      var connection = await mongoose.connect(this.mongoUrl, {
        useNewUrlParser: true
      });
    } catch (exception) {
        winstonLogger.logger.log(
        "error",
        "Something went wrong connecting to mongo",
        exception
      );
    } finally {
        winstonLogger.logger.log("info", "Mongoose connection result ", {
        connectionIsSuccesfull: connection.connection.listeners.length > 0
      });
    }
  }

  private initializeMiddlewares(): void{
    this.app.use(cors());
    
    this.app.options('*', cors());

    this.app.use(bodyParser.json());

    this.app.use(bodyParser.urlencoded({ extended: false }));

    this.app.use(requestsInterceptor);

    this.app.use(forceSSl);

    this.app.use(errorMiddleware);
  }

  private config(): void {
    this.app.set("port", process.env.PORT || 3000);
  }

  public start(): void {
    https
      .createServer(this.httpOptions, this.app)
      .listen(this.app.get("port"), () => {
        winstonLogger.logger.log(
          "info",
          "Express server listening on port " + this.app.get("port")
        );
      });
  }

}

