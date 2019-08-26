import app from "./app";
import * as https from 'https';
import * as fs from 'fs';
import {logger} from '../src/utils/logger';

const httpOptions = {
    key: fs.readFileSync('./config/key.pem'),
    cert: fs.readFileSync('./config/cert.pem')
}

https
    .createServer(httpOptions , app)
    .listen(app.get('port') ,  () => {
        logger.log('info','Express server listening on port ' + app.get('port'));
    });

