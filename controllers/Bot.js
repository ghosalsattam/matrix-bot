'use strict';

import {writeJson} from '../utils/writer.js';
import {getAllRoomsService, getMessagesService} from "../service/botService.js"

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
