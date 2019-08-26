import { Server } from "@overnightjs/core";
import { logger } from "./utils/logger";
import * as controllers from './controllers';
import app from "./app";
import * as fs from 'fs';
import * as https from 'https';

class ExampleServer extends Server {

    private readonly SERVER_STARTED = 'Example server started on port: ';

    private readonly  httpOptions = {
        key: fs.readFileSync('./config/key.pem'),
        cert: fs.readFileSync('./config/cert.pem')
    }

    constructor() {
        super(true);
        this.setupControllers();
    }


    private setupControllers(): void {
        const ctlrInstances = [];
        for (const name in controllers) {
            if (controllers.hasOwnProperty(name)) {
                const controller = (controllers as any)[name];
                ctlrInstances.push(new controller());
            }
        }
        super.addControllers(ctlrInstances);
    }


    public start(port: number): void {

        app.get('*', (req, res) => {
            res.send(this.SERVER_STARTED + port);
        });


        https
        .createServer(this.httpOptions , app)
        .listen(app.get('port') ,  () => {
            logger.log('info','Express server listening on port ' + app.get('port'));
        });
    
    }
}

export default ExampleServer;
