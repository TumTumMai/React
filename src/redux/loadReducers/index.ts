/* eslint-disable quotes */
import { IAction, ILoadReducers, LoadActionType } from './type';

const initialState: ILoadReducers = {
  status: false
};

function load(
  state: ILoadReducers = initialState,
  action: IAction
): ILoadReducers {
  switch (action.type) {
    case LoadActionType.LOADING_ON:
      return {
        status: true
      };
    case LoadActionType.LOADING_OFF:
      return initialState;
    default:
      return state;
  }
}

export default load;
