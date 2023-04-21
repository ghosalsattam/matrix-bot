import express from 'express';
const router = express.Router();
import * as botController from "../controllers/BotController.js"
router.get("/rooms", function (req, res) {
    botController.getAllRoomsController(req, res);
});
router.get("/rooms/:roomId", function (req, res) {
    botController.getMessagesController(req, res, req.params["roomId"]);
});

router.post("/rooms/:roomId", function (req, res) {
  botController.postMessagesController(req, res, req.params["roomId"]);
});

export default {
  router
};
