import * as actionTypes from "../types/chatTypes";

const initialState = {
  accessChat: null,
  allChats: null,
  error: "",
  response: "",
  isLoading: false,
  userList: null,
  createGroupData: null,
  newName: "",
  newParticipant: null,
  removeParticipant: null,
  socket: null,
  socketConnected: false,
  isTyping:false,
  typing:false,

};

export default function rootReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.ACCESS_CHAT_SUCCESS:
      return {
        ...state,
        accessChat: payload,
        isLoading: false,
      };
    case actionTypes.ACCESS_CHAT_FAIL:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    case actionTypes.ACCESS_CHAT_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.FETCH_CHATS_SUCCESS:
      return {
        ...state,
        allChats: payload,
        isLoading: false,
      };
    case actionTypes.FETCH_CHATS_FAIL:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    case actionTypes.FETCH_CHATS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.SHOW_USERLIST:
      return {
        ...state,
        userList: payload,
        isLoading: false,
      };
    case actionTypes.SHOW_USERLIST_FAIL:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    case actionTypes.SHOW_USERLIST_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.CREATE_GROUP:
      return {
        ...state,
        createGroupData: payload,
        isLoading: false,
      };
    case actionTypes.CREATE_GROUP_FAIL:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    case actionTypes.CREATE_GROUP_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.RENAME_GROUP:
      return {
        ...state,
        newName: payload,
        isLoading: false,
      };
    case actionTypes.RENAME_GROUP_FAIL:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    case actionTypes.RENAME_GROUP_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.ADD_NEW_MEMBER:
      return {
        ...state,
        newParticipant: payload,
        isLoading: false,
      };
    case actionTypes.ADD_NEW_MEMBER_FAIL:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    case actionTypes.ADD_NEW_MEMBER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.REMOVE_MEMBER:
      return {
        ...state,
        removeParticipant: payload,
        isLoading: false,
      };
    case actionTypes.REMOVE_MEMBER_FAIL:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    case actionTypes.REMOVE_MEMBER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.NEW_SOCKET:
      return {
        ...state,
        socket: payload,
      };
    case actionTypes.SET_SOCKET_CONNECTED:
      return {
        ...state,
        socketConnected: payload,
      };
      case actionTypes.IS_TYPING:
        return {
          ...state,
          isTyping: payload,
        };
        case actionTypes.TYPING:
          return {
            ...state,
            typing: payload,
          };
          
     

    default:
      return state;
  }
}
