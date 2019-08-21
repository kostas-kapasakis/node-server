// lib/app.ts
import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/crmRoutes";
import * as mongoose from "mongoose";
import * as cors from 'cors';

class App {

    public app: express.Application;
    public routePrv: Routes = new Routes();
    public mongoUrl: string = 'mongodb://mongo:28017/CRMdb';  



    constructor() {
        this.app = express();
        this.config(); 
        this.routePrv.routes(this.app);
        this.mongoSetup();     
       
    }

    private async mongoSetup(): Promise<void>{
        mongoose.Promise = global.Promise;
        await mongoose.connect(this.mongoUrl,{useNewUrlParser:true});    
    }

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.app.use(cors);

        this.app.use(express.static(__dirname));
    }

}

export default new App().app;