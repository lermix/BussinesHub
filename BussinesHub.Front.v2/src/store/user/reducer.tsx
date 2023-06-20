import { IUserState, IUserActionType } from "./interfaces";
import * as actionTypes from "./actionTypes";
import { VerifiedUserClass } from "../../models/User";

const initialState: IUserState = {
  verifiedUser: null,
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
    case actionTypes.GET_USER_COMPANIES:
      return {
        ...state,
        companies: action.companies,
      };

    case actionTypes.EDIT_COMPANY:
      return {
        ...state,
        companies: [
          ...state.companies.filter((e) => e.id != action.company.id),
          action.company,
        ],
      };
    case actionTypes.DELETE_COMPANY:
      return {
        ...state,
        companies: [...state.companies.filter((e) => e.id != action.companyId)],
      };
    default:
      return state;
  }
}
