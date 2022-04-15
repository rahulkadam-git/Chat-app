const router = require("express").Router();
const controller = require("../controller/msg.controller");

router.post("/", controller.sendMessage);
router.get("/:chatId", controller.allMessages);

module.exports = router;
