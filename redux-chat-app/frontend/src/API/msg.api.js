import api from "./api";

const getMessages = async (chatId) => {
  return await api.get(`/message/${chatId}`);
};

const sendMesaage = async (msgBody) => {
  return await api.post(`/message/`, msgBody);
};

export { getMessages, sendMesaage };
