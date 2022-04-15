import api from "./api";

const accessChatApi = async (userIds) => {
  return await api.post(`/chat/chat`, userIds);
};

const fetchChatApi = async (currentUserId) => {
  return await api.get(`/chat/chat/${currentUserId}`);
};

const searchUsers = async (search) => {
  return await api.get(`/allusers?search=${search}`);
};

const createGroupChat = async (CreateGroupInformation) => {
  return await api.post(`/chat/group`, CreateGroupInformation);
};

const renameGroupChat = async (newNameDetails) => {
  return await api.put(`/chat/rename`, newNameDetails);
};

const addNewParticipant = async (NewParticipant) => {
  return await api.put(`/chat/groupadd`, NewParticipant);
};

const removeParticipant = async (removeParticipantInfo) => {
  return await api.put(`/chat/remove`, removeParticipantInfo);
};

export {
  accessChatApi,
  fetchChatApi,
  searchUsers,
  createGroupChat,
  renameGroupChat,
  addNewParticipant,
  removeParticipant,
};
