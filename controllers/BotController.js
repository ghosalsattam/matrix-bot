'use strict';

import {writeJson} from '../utils/writer.js';
import {getAllRoomsService, getMessagesService, postMessagesService} from "../service/botService.js"

export function getAllRoomsController (req, res, next) {
  getAllRoomsService()  
  .then(function (response) {
      writeJson(res, response);
    })
    .catch(function (response) {
      writeJson(res, response);
    });
};

export function getMessagesController (req, res, roomId) {
  getMessagesService(roomId, res)
    .then(function (response) {
      writeJson(res, response);
    })
    .catch(function (response) {
      writeJson(res, response);
    });
};

export function postMessagesController (req, res, roomId) {
  postMessagesService(roomId, req.body)
    .then(function (response) {
      writeJson(res, response);
    })
    .catch(function (response) {
      writeJson(res, response);
    });
};
