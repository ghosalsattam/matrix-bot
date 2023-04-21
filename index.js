'use strict';

import * as http from "http";
import express from "express";
import Router from "./router/router.js";
import bodyParser from "body-parser"
import { getLiveMessages } from "./interface/matrix.client.js"
import cors from "cors"
import {roomConf} from "./conf/botConf.js"
import YAML from 'yaml'
import swaggerUi from "swagger-ui-express"
import fs from "fs"

const file  = fs.readFileSync('./openapi.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)

//This is used allow cors and cors pre-flight checks
var app=express()

app.use(cors());
app.options("*", cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

var serverPort = 8000;

// swaggerRouter configuration
app.use("/matrix/v1/bot/", Router.router)
app.use("*", function (req, res) {
    res.status(404).send({
      error: "Resource not found"
    });
  });

http.createServer(app).listen(serverPort, function () {
    console.log('\x1b[35m%s\x1b[0m',`\n\n\nYour server is listening on port ${serverPort} (http://localhost:${serverPort})`);
    console.log('\x1b[35m%s\x1b[0m',`Swagger-ui is available on http://localhost:${serverPort}/api-docs. Open the link to view the swagger docs\n\n\n`);
    getLiveMessages(roomConf.roomId);
});

