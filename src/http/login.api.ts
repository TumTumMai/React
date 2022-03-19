import http from "./index";
import api from "../constants/api";
import {
  IPramasGetProfile,
  IPramasLoginCallback,
  IGetProFile,
  ICallback
} from "../models/login.api";

const loginApi = {
  getProfile: async (props: IPramasGetProfile): Promise<IGetProFile> => {
    try {
      const user = await http.get(api.getProfile, {
        headers: {
          Authorization: "Bearer " + props.jwt
        }
      });

      return { user: user.data };
    } catch (e: any) {
      return { error: e.response.data.error };
    }
  },
  loginGoogleWithStrapi: (): void => {
    window.location.href = api.login;
  },
  loginCallback: async (props: IPramasLoginCallback): Promise<ICallback> => {
    try {
      const user = await http.get(api.loginCallback + props.idToken);

      return user.data;
    } catch (e: any) {
      return e.response.data.error;
    }
  }
};

export default loginApi;
