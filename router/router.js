import express from 'express';
const router = express.Router();
import * as botController from "../controllers/Bot.js"
router.get("/rooms", function (req, res) {
    botController.getAllRoomsController(req, res);
});
router.get("/rooms/:roomId", function (req, res) {
    botController.getMessagesController(req, res, req.params["roomId"]);
});

export default {
  router
};
