import {
  instance,
  APIResponseType,
  ResultCodesEnum,
  ResultCodeForCaptchaEnum,
} from "./api";

type MeResponseDataType = {
  id: number;
  email: string;
  login: string;
};

type LoginResponseDataType = {
  userId: number;
};

export const authAPI = {
  me() {
    return instance
      .get<APIResponseType<MeResponseDataType>>(`auth/me`)
      .then((res) => res.data);
  },
  login(
    email: string,
    password: string,
    rememberMe = false,
    captcha: null | string = null
  ) {
    return instance
      .post<
        APIResponseType<
          LoginResponseDataType,
          ResultCodeForCaptchaEnum | ResultCodesEnum
        >
      >(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((res) => res.data);
  },
  logout() {
    return instance.delete(`auth/login`);
  },
};
