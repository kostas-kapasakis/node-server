"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// lib/server.ts
const app_1 = require("./app");
const https = require("https");
const fs = require("fs");
const PORT = 3000;
const httpOptions = {
    key: fs.readFileSync('./config/key.pem'),
    cert: fs.readFileSync('./config/cert.pem')
};
https.createServer(httpOptions, app_1.default).listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
});
//# sourceMappingURL=server.js.map