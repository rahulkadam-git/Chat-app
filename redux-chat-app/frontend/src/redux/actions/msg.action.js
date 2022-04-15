import * as actionTypes from "../types/msgTypes";
import { getMessages, sendMesaage } from "../../API/msg.api";

export const getMessagesActions = (chatId) => async (dispatch) => {
  dispatch(getMessagesLoading(true));
  try {
    const getMessagesSuccessfull = await getMessages(chatId);

    dispatch({
      type: actionTypes.GET_MESSAGES,
      payload: getMessagesSuccessfull.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_MESSAGES_FAIL,
      payload: { err: error.response.data || "Could not get messages" },
    });
  }
};

export const getMessagesLoading = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_MESSAGES_LOADING,
    payload: data,
  });
};

export const sendMessageAction = (msgBody, socket) => async (dispatch) => {
  dispatch(sendMessageLoading(true));
  try {
    const sendMessageSuccessfull = await sendMesaage(msgBody);
    socket.emit("new message", sendMessageSuccessfull.data);

    if (sendMessageSuccessfull.status === 200) {
      dispatch(getMessagesActions(msgBody.chatId));
    }
    dispatch({
      type: actionTypes.SEND_MESSAGE,
      payload: sendMessageSuccessfull.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.SEND_MESSAGE_FAILED,
      payload: "Could not get messages",
    });
  }
};

export const sendMessageLoading = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.SEND_MESSAGE_LOADING,
    payload: data,
  });
};

export const selectedChatId = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_SELECTED_CHAT_ID,
    payload: data,
  });
};

export const selectedChatFullDetails = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_SELECTED_CHAT_FULL_DETAILS,
    payload: data,
  });
};

export const newMessageReceivedAction = (data) => (dispatch) => {
  
  dispatch({
    type: actionTypes.NEW_MESSAGE_RECEIVED,
    payload: data,
  });
};

export const notificationAction = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.NOTIFICATION,
    payload: data,
  });
};


