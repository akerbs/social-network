import { ResultCodesEnum, ResultCodeForCaptchaEnum } from "../api/api";
import { stopSubmit, FormAction } from "redux-form";
import { authAPI } from "../api/auth-api";
import { securityAPI } from "../api/security-api";
import { BaseThunkType, InferActionsTypes } from "./redux-store";

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null, // if null, then captcha is not required
};
export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;

const authReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "SN/AUTH/SET_USER_DATA":
    case "SN/AUTH/GET_CAPTCHA_URL_SUCCESS":
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

//                       Action Creators => Action(object) to despatch
export const actions = {
  setAuthUserData: (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) =>
    ({
      type: "SN/AUTH/SET_USER_DATA",
      payload: { userId, email, login, isAuth },
    } as const),

  getCaptchaUrlSuccess: (captchaUrl: string) =>
    ({
      type: "SN/AUTH/GET_CAPTCHA_URL_SUCCESS",
      payload: { captchaUrl },
    } as const),
};

//                       Thunk Creator => Thunk(function) to despatch
export const getAuthUserData = (): ThunkType => async (dispatch) => {
  let meData = await authAPI.me();
  if (meData.resultCode === ResultCodesEnum.Success) {
    let { id, login, email } = meData.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
  }
};

export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string
): ThunkType => async (dispatch) => {
  let data = await authAPI.login(email, password, rememberMe, captcha);
  if (data.resultCode === ResultCodesEnum.Success) {
    // success, get auth data
    dispatch(getAuthUserData());
  } else {
    if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
      dispatch(getCaptchaUrl());
    }
    let message = data.messages.length > 0 ? data.messages[0] : "Some error";
    dispatch(stopSubmit("login", { _error: message }));
  }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const data = await securityAPI.getCaptchaUrl();
  const captchaUrl = data.url;
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
};

export const logout = (): ThunkType => async (dispatch) => {
  let response = await authAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};

export default authReducer;
