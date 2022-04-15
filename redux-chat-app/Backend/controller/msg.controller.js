const Message = require("../model/model.msg");
const User = require("../model/model.user");
const Chat = require("../model/model.chat");

exports.sendMessage = async (req, res) => {
  const { content, chatId, currentUserId } = req.body;
  if (!content || !chatId) {
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: currentUserId,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
    message.save();
    const updateChat = await Chat.findByIdAndUpdate(
      req.body.chatId,
      { latestMessage: message },
      { new: true }
    );
    return res.status(200).json(message);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

exports.allMessages = async (req, res) => {
  try {
    if (!req.params.chatId) {
      return res.status(400).json("not found");
    }
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");

    return res.status(200).json(messages);
  } catch (error) {
   
    return res.status(400).json("erroe");
    throw new Error(error.message);
  }
};
