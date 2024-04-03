const Router = require("./custom_router.js"),
  MessageManager = require("../dao/db/managers/message_manager.js");

const messageManager = new MessageManager();

class MessageRouter extends Router {
  init() {
    this.post("/", ["PUBLIC"], async (req, res) => {
      try {
        const io = require("../app.js");

        const message = await messageManager.saveMessage(req.body);

        if (message.status) {
          io.sockets.emit("new message", req.body);
          return res.sendCreatedSuccess(req.body);
        } else {
          return res.sendUserError(message.error);
        }
      } catch (err) {
        return res.sendServerError(err);
      }
    });
  }
}

module.exports = MessageRouter;
