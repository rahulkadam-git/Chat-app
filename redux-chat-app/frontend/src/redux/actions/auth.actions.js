import * as actionTypes from "../types/types";
import jwt_decode from "jwt-decode";
import { registerApi, loginApi, logoutApi ,searchChat} from "../../API/auth.api";

//register action

export const registerAction = (newUser) => async (dispatch) => {
  try {
    const registerUserSuccesfully = await registerApi(newUser);

    dispatch({
      type: actionTypes.REGISTER_SUCCESS,
      payload: registerUserSuccesfully.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.REGISTER_FAIL,
      payload: { err: error.response.data || "Registration Failed" },
    });
  }
};

//login action

export const loginAction = (userCredential) => async (dispatch) => {
  try {
    const loginUserSuccesfully = await loginApi(userCredential);

    const { token } = loginUserSuccesfully.data;

    dispatch(loginSuccess(token));
  } catch (error) {
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      payload: { err: error.response.data || "Login Failed" },
    });
  }
};

export const loginSuccess = (data) => (dispatch) => {
  localStorage.setItem("user", data);
  const decode_token = jwt_decode(data);
 

  dispatch({
    type: actionTypes.LOGIN_SUCCESS,
    payload: decode_token,
  });
};

export const clearResponse = () => (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_RESPONSE,
  });
};
export const clearError = () => (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_ERROR,
  });
};

//logout action
export const logoutAction = () => (dispatch) => {
  const msg = logoutApi();
  dispatch({
    type: actionTypes.LOGOUT,
    payload: { msg },
  });
  return Promise.resolve(msg);
};

export const getSearchList = (search) => async (dispatch) => {
  dispatch(searchListLoading(true));
  try {
    const getSearchList = await searchChat(search);

    

    dispatch({
      type: actionTypes.SHOW_SEARCHLIST,
      payload: getSearchList.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.SHOW_SEARCHLIST_FAIL,
      payload: { err: error.data || "data not found" },
    });
  }
};

export const searchListLoading = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.SHOW_SEARCHLIST_LOADING,
    payload: data,
  });
};


