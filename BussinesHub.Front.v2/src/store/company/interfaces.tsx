import { Company } from "../../models/Company";
import { Store } from "../../models/Store";
import * as actionTypes from "./actionTypes";

// STATE
export interface ICompanyState {
  selectedCompany: Company | null;
}
interface IGetCompanyStores {
  type: typeof actionTypes.GET_COMPANY_STORES;
  stores: Store[];
}

interface ISetSelectedCompany {
  type: typeof actionTypes.SET_SELECTED_COMPANY;
  company: Company;
}

interface IAddCompanyStore {
  type: typeof actionTypes.ADD_COMPANY_STORE;
  store: Store;
}

export type ICompanyActionType =
  | IGetCompanyStores
  | IAddCompanyStore
  | ISetSelectedCompany;
