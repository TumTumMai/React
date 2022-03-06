import { IAuthReducers, IAction, AuthActionType } from "./type";

const initialState: IAuthReducers = {
  loggedIn: null,
  token: null,
  user: null
};

function authorization(
  state: IAuthReducers = initialState,
  action: IAction
): IAuthReducers {
  switch (action.type) {
    case AuthActionType.LOGIN_SUCCESS:
      if (action?.payload) {
        return action.payload;
      } else {
        return {
          loggedIn: false,
          token: null,
          user: null
        };
      }
    case AuthActionType.LOGIN_FAILURE:
      return {
        loggedIn: false,
        token: null,
        user: null
      };
    case AuthActionType.LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default authorization;
