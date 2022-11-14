import { requests } from "../agent";
import * as actionTypes from "./actionTypes";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../rootReducer";
import { Action } from "redux";
import { turnOffLoading, turnOnLoading } from "../shared/actions";
import { Store } from "../../models/Store";
import { ICompanyActionType } from "./interfaces";
import { Company } from "../../models/Company";

const apiActions = {
  getCompanyStores: (companyId: number): Promise<Store[]> =>
    requests.get(`Company/GetCompanyStores?companyId=${companyId}`),
  createStore: (companyId: number, store: Store): Promise<Store> =>
    requests.post(`Company/CreateStore?companyId=${companyId}`, store),
};

export const getCompanyStores =
  (companyId: number): ThunkAction<void, AppState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      dispatch(turnOnLoading());
      dispatch(
        getCompanyStoresSuccess(await apiActions.getCompanyStores(companyId))
      );
      dispatch(turnOffLoading());
    } catch (error) {
      console.error(error);
      dispatch(turnOffLoading());
    }

    function getCompanyStoresSuccess(stores: Store[]): ICompanyActionType {
      return {
        type: actionTypes.GET_COMPANY_STORES,
        stores: stores,
      };
    }
  };

export const createStore =
  (
    companyId: number,
    store: Store
  ): ThunkAction<void, AppState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      dispatch(turnOnLoading());
      dispatch(
        createStoreSuccess(await apiActions.createStore(companyId, store))
      );
      dispatch(turnOffLoading());
    } catch (error) {
      console.error(error);
      dispatch(turnOffLoading());
    }

    function createStoreSuccess(store: Store): ICompanyActionType {
      return {
        type: actionTypes.ADD_COMPANY_STORE,
        store: store,
      };
    }
  };
export const setSelectedCompany =
  (company: Company): ThunkAction<void, AppState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      console.log("HERE");
      dispatch(getCompanyStoresSuccess(company));
    } catch (error) {
      console.error(error);
    }

    function getCompanyStoresSuccess(company: Company): ICompanyActionType {
      return {
        type: actionTypes.SET_SELECTED_COMPANY,
        company: company,
      };
    }
  };
