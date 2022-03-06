import http from "./index";
import api from "../constants/api";
import {
  IPramasGetProfile,
  IPramasLoginCallback,
  IUser
} from "../models/login.api";

const loginApi = {
  getProfile: async (props: IPramasGetProfile): Promise<IUser | undefined> => {
    try {
      const user = await http.get(api.getProfile, {
        headers: {
          Authorization: "Bearer " + props.jwt
        }
      });
      return user.data;
    } catch {
      return undefined;
    }
  },
  loginGoogleWithStrapi: (): void => {
    window.location.href = api.login;
  },
  loginCallback: async (
    props: IPramasLoginCallback
  ): Promise<string | null> => {
    try {
      const user = await http.get(api.loginCallback + props.idToken);

      if (user?.data?.jwt) {
        return user.data.jwt;
      } else {
        return null;
      }
    } catch {
      return null;
    }
  }
};

export default loginApi;
