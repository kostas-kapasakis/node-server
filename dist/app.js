"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// lib/app.ts
const express = require("express");
const bodyParser = require("body-parser");
const crmRoutes_1 = require("./routes/crmRoutes");
const mongoose = require("mongoose");
const cors = require("cors");
class App {
    constructor() {
        this.routePrv = new crmRoutes_1.Routes();
        this.mongoUrl = 'mongodb://mongo:28017/CRMdb';
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();
    }
    mongoSetup() {
        return __awaiter(this, void 0, void 0, function* () {
            mongoose.Promise = global.Promise;
            yield mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
        });
    }
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors);
        this.app.use(express.static(__dirname));
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map