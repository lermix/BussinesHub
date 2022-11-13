import { IUserState, IUserActionType } from "./interfaces";
import * as actionTypes from "./actionTypes";
import { VerifiedUserClass } from "../../models/User";

const initialState: IUserState = {
  verifiedUser: new VerifiedUserClass(),
  companies: [],
};

export function userReducer(
  state: IUserState = initialState,
  action: IUserActionType
): IUserState {
  switch (action.type) {
    case actionTypes.USER_LOGIN:
      return {
        ...state,
        verifiedUser: action.verifiedUser,
      };
    case actionTypes.CREATE_COMPANY:
      return {
        ...state,
        companies: [...state.companies, action.company],
      };

    default:
      return state;
  }
}
