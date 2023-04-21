'use strict';

import * as http from "http";
import express from "express";
import Router from "./router/router.js";
import bodyParser from "body-parser"
import { getLiveMessages } from "./interface/matrix.client.js"
import cors from "cors"
//This is used allow cors and cors pre-flight checks
var app=express()

app.use(cors());
app.options("*", cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var oas3Tools = import('oas3-tools');
var serverPort = 8000;

// swaggerRouter configuration
app.use("/matrix/v1/bot/", Router.router)
app.use("*", function (req, res) {
    res.status(404).send({
      error: "Resource not found"
    });
  });

// var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
// var app = expressAppConfig.getApp();

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
    getLiveMessages("!KUdDHfXkmsoyuwOfko:matrix.org")
});

