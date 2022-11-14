import { ICompanyActionType, ICompanyState } from "./interfaces";
import * as actionTypes from "./actionTypes";

const initialState: ICompanyState = {
  selectedCompany: null,
};

export function companyReducer(
  state: ICompanyState = initialState,
  action: ICompanyActionType
): ICompanyState {
  switch (action.type) {
    case actionTypes.GET_COMPANY_STORES: {
      if (state.selectedCompany) {
        return {
          ...state,
          selectedCompany: { ...state.selectedCompany, stores: action.stores },
        };
      } else
        return {
          ...state,
        };
    }

    case actionTypes.SET_SELECTED_COMPANY:
      return {
        ...state,
        selectedCompany: action.company,
      };

    case actionTypes.ADD_COMPANY_STORE: {
      if (state.selectedCompany && state.selectedCompany?.stores) {
        return {
          ...state,
          selectedCompany: {
            ...state.selectedCompany,
            stores: [...state.selectedCompany?.stores, action.store],
          },
        };
      } else if (state.selectedCompany) {
        return {
          ...state,
          selectedCompany: {
            ...state.selectedCompany,
            stores: [action.store],
          },
        };
      }
    }

    default:
      return state;
  }
}
