const router = require("express").Router();
const controller = require("../controller/chat.controller");

router.post("/chat", controller.accessChat);
router.get("/chat/:currentUserId", controller.fetchChat);
router.post("/group", controller.createGroupChat);
router.put("/rename", controller.renameGroupChat);
router.put("/remove", controller.removeFromChat);
router.put("/groupadd", controller.addToGroupChat);

module.exports = router;
