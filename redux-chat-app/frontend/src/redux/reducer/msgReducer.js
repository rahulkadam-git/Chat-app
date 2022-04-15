import * as actionTypes from "../types/msgTypes";

const initialState = {
  selectedChat: null,
  error: "",
  response: "",
  isLoading: false,
  selectedChatId: "",
  selectedChatfulldetails: null,
  notification: [],
  message:null
  // fetchAgin:false
};

export default function rootReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_MESSAGES:
      return {
        ...state,
        selectedChat: payload,
        isLoading: false,
      };
    case actionTypes.GET_MESSAGES_FAIL:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    case actionTypes.GET_MESSAGES_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.SEND_MESSAGE:
      return {
        ...state,
        message: payload,
        isLoading: false,
      };
    case actionTypes.SEND_MESSAGE_FAILED:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    case actionTypes.SEND_MESSAGE_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.GET_SELECTED_CHAT_ID:
      return {
        ...state,
        selectedChatId: payload,
      };
    case actionTypes.GET_SELECTED_CHAT_FULL_DETAILS:
      return {
        ...state,
        selectedChatfulldetails: payload,
      };
    case actionTypes.NEW_MESSAGE_RECEIVED:
      return {
        ...state,
        message: payload,
      };
    case actionTypes.NOTIFICATION:
      return {
        ...state,
        notification: [payload,...state.notification],
      };
      // case actionTypes.FETCH_AGAIN:
      // return {
      //   ...state,
      //   notification: payload,
      // };

    default:
      return state;
  }
}
