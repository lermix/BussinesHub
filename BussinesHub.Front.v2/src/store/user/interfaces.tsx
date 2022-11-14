import { Company } from "../../models/Company";
import { VerifiedUser } from "../../models/User";
import * as actionTypes from "./actionTypes";

// STATE
export interface IUserState {
  verifiedUser: VerifiedUser;
  companies: Company[];
}
interface IUserLogin {
  type: typeof actionTypes.USER_LOGIN;
  verifiedUser: VerifiedUser;
}

interface ICreateCompany {
  type: typeof actionTypes.CREATE_COMPANY;
  company: Company;
}

interface IGetUserCompany {
  type: typeof actionTypes.GET_USER_COMPANIES;
  companies: Company[];
}

interface IEditCompany {
  type: typeof actionTypes.EDIT_COMPANY;
  company: Company;
}

interface IDeleteCompany {
  type: typeof actionTypes.DELETE_COMPANY;
  companyId: number;
}

export type IUserActionType =
  | IUserLogin
  | ICreateCompany
  | IGetUserCompany
  | IEditCompany
  | IDeleteCompany;
