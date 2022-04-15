const { findByIdAndUpdate } = require("../model/model.chat");
const Chat = require("../model/model.chat");
const User = require("../model/model.user");

exports.accessChat = async (req, res) => {
  const { userId, currentUserId } = req.body;

  

  if (!userId) {
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      {
        users: { $elemMatch: { $eq: currentUserId } },
      },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");
    console.log("first");
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [currentUserId, userId],
    };

    try {
     
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );     
     return res.status(200).send(fullChat);     
    } catch (error) {
     return res.status(400).json("error");
    }
  }
};

exports.fetchChat = async (req, res) => {
  try {
    if (!req.body) {
     
      return res.status(200).json("Chat not found ");
    }

    const { currentUserId } = req.params;
    await Chat.find({
      users: { $elemMatch: { $eq: currentUserId } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });

        return res.status(200).send(results);

      

     
      });
  } catch (error) {
    res.status(400).json("error");
  }
};

exports.createGroupChat = async (req, res) => {
  if (!req.body.users || !req.body.name || !req.body.currentUserId) {
    return res.status(400).send({ message: "please fill all the details" });
  }
  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  users.push(req.body.currentUserId);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });
    const fullGroupChat = await Chat.findOne({ _id: groupChat.id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400).json("error");
  }
};

exports.renameGroupChat = async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!updatedChat) {
    res.status(404).json("chat not found");
  } else {
    res.json(updatedChat);
  }
};

exports.addToGroupChat = async (req, res) => {

  console.log(req.body)
  const { chatId, newUserList } = req.body;

  var newUsers = JSON.parse(newUserList);

  const added = await Chat.findByIdAndUpdate(
    chatId,
    { $push: { users: newUsers } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404).json("chat not found");
  } else {
    res.json(added);
  }
};

exports.removeFromChat = async (req, res) => {
  const { chatId, userId } = req.body;
  const removed = await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404).json("chat not found");
  } else {
    res.json(removed);
  }
};
