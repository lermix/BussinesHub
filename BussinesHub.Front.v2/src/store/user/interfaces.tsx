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

export type IUserActionType = IUserLogin | ICreateCompany;
