import * as actionTypes from "../types/chatTypes";
import {
  accessChatApi,
  fetchChatApi,
  searchUsers,
  createGroupChat,
  renameGroupChat,
  addNewParticipant,
  removeParticipant,
} from "../../API/chat.api";


import {selectedChatFullDetails} from "./msg.action"

export const accessChatAction = (userIds) => async (dispatch) => {
  console.log(userIds)
  dispatch(chatLoading(true));
  try {
    const accessChatActionSuccessful = await accessChatApi(userIds);

    dispatch({
      type: actionTypes.ACCESS_CHAT_SUCCESS,
      payload: accessChatActionSuccessful.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ACCESS_CHAT_FAIL,
      payload: { err: error.response.data || "Registration Failed" },
    });
  }
};

export const chatLoading = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.ACCESS_CHAT_LOADING,
    payload: data,
  });
};

export const fetchChatsAction = (currentUserId) => async (dispatch) => {
  dispatch(allChatsLoading(true));
  try {
    const fetchChatsActionSuccessfull = await fetchChatApi(currentUserId);

    dispatch({
      type: actionTypes.FETCH_CHATS_SUCCESS,
      payload: fetchChatsActionSuccessfull.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.FETCH_CHATS_FAIL,
      payload: { err: error.response.data || "Registration Failed" },
    });
  }
};

export const allChatsLoading = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.FETCH_CHATS_LOADING,
    payload: data,
  });
};

export const getUserList = (search) => async (dispatch) => {
  dispatch(userListLoading(true));
  try {
    const getSearchList = await searchUsers(search);

    dispatch({
      type: actionTypes.SHOW_USERLIST,
      payload: getSearchList.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.SHOW_USERLIST_FAIL,
      payload: { err: error.data || "data not found" },
    });
  }
};

export const userListLoading = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.SHOW_USERLIST_LOADING,
    payload: data,
  });
};

export const createGroupChatAction = (CreateGroupInformation) => async (
  dispatch
) => {
  dispatch(createGroupLoading(true));
  try {
    const createGroup = await createGroupChat(CreateGroupInformation);
    console.log(createGroup.data);
    if (createGroup.status === 200) {
      dispatch(fetchChatsAction(CreateGroupInformation.currentUserId));
    }
    dispatch({
      type: actionTypes.CREATE_GROUP,
      payload: createGroup.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.CREATE_GROUP_FAIL,
      payload: { err: error.data || "data not found" },
    });
  }
};

export const createGroupLoading = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.CREATE_GROUP_LOADING,
    payload: data,
  });
};

export const renameGroupAction = (newNameDetails, currentUserId) => async (
  dispatch
) => {
  dispatch(renameGroupActionLoading(true));
  try {
    const renameGroup = await renameGroupChat(newNameDetails);

    if (renameGroup.status === 200) {
      dispatch(fetchChatsAction(currentUserId));
    }

    dispatch({
      type: actionTypes.RENAME_GROUP,
      payload: renameGroup.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.RENAME_GROUP_FAIL,
      payload: { err: error.data || "data not found" },
    });
  }
};

export const renameGroupActionLoading = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.RENAME_GROUP_LOADING,
    payload: data,
  });
};

export const addNewparticipantAction = (
  newParticipantDetails,
  currentUserId
) => async (dispatch) => {
  dispatch(addNewparticipantLoading(true));
  try {
    const addNewParticipantSuccess = await addNewParticipant(
      newParticipantDetails
    );

    console.log(addNewParticipantSuccess.data);

    if (addNewParticipantSuccess.status === 200) {
      dispatch(selectedChatFullDetails(addNewParticipantSuccess.data));
    }

    dispatch({
      type: actionTypes.ADD_NEW_MEMBER,
      payload: addNewParticipantSuccess.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_NEW_MEMBER_FAIL,
      payload: { err: error.data || "data not found" },
    });
  }
};

export const addNewparticipantLoading = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.ADD_NEW_MEMBER_LOADING,
    payload: data,
  });
};

export const removeParticipantAction = (
  removeParticipantInfo,
  currentUserId
) => async (dispatch) => {
  dispatch(removeParticipantLoading(true));
  try {
    const removeParticipantSuccess = await removeParticipant(
      removeParticipantInfo
    );

    console.log(removeParticipantSuccess.data);

    if (removeParticipantSuccess.status === 200) {
      dispatch(selectedChatFullDetails(removeParticipantSuccess.data));
    }

    dispatch({
      type: actionTypes.REMOVE_MEMBER,
      payload: removeParticipantSuccess.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.REMOVE_MEMBER_FAIL,
      payload: { err: error.data || "data not found" },
    });
  }
};

export const removeParticipantLoading = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.REMOVE_MEMBER_LOADING,
    payload: data,
  });
};

export const newSocketAction = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.NEW_SOCKET,
    payload: data,
  });
};

export const setSocketConnected = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_SOCKET_CONNECTED,
    payload: data,
  });
};

export const isTypingAction = (data) => (dispatch) => {
  
  dispatch({
    type: actionTypes.IS_TYPING,
    payload: data,
  });
};

export const typingAction = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.TYPING,
    payload: data,
  });
};

