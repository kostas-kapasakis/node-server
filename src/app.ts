import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as cors from 'cors';
import "reflect-metadata";

import * as forceSSl from 'express-force-ssl';
import * as customLogger from "./utils/logger";
import { requestsInterceptor } from "./middlewares/requests-interceptor";

class App {

    public app: express.Application;
    public mongoUrl: string = 'mongodb://localhost:27017/Crmdb';
    public baseDir = __dirname;

    constructor() {
        this.app = express();
        this.config();
        this.mongoSetup();
    }

    private async mongoSetup(): Promise<void> {
        try {
            var connection = await mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
        }
        catch (exception) {
            customLogger.logger.log('error', 'Something went wrong connecting to mongo', exception);
        }
        finally {
            customLogger.logger.log('info', 'Mongoose connection result ',{
                connectionIsSuccesfull: connection.connection.listeners.length > 0
            });
        }
    }

    private config(): void {
        this.app.use(requestsInterceptor);

        this.app.use(bodyParser.json());

        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.app.use(cors);

        this.app.set("port", process.env.PORT || 3000);

        this.app.use(forceSSl);

        this.app.use(express.static(__dirname));


    }

}

export default new App().app;