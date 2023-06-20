import { requests } from "../agent";
import * as actionTypes from "./actionTypes";
import { IUserActionType } from "./interfaces";
import {
  LoginDto,
  User,
  VerifiedUser,
  VerifiedUserClass,
} from "../../models/User";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../rootReducer";
import { Action } from "redux";
import {
  toggleNotification,
  turnOffLoading,
  turnOnLoading,
} from "../shared/actions";
import { Company } from "../../models/Company";

const apiActions = {
  login: (userLogin: LoginDto): Promise<VerifiedUser> =>
    requests.post(`Security/Login`, userLogin),
  CheckUserToken: (): Promise<boolean> =>
    requests.get(`Security/CheckUserToken`),
  register: (user: User): Promise<void> =>
    requests.post(`User/CreateUser`, user),
  CreateCompany: (company: Company, username: string): Promise<Company> =>
    requests.post(`Company/CreateCompany?username=${username}`, company),
  DeleteCompany: (companyId: number): Promise<boolean> =>
    requests.post(`Company/DeleteCompany`, companyId),
  AddCopmanyToUser: (userId: number, companyId: number) =>
    requests.post(
      `User/AddCompanyToUser?userId=${userId}&companyId=${companyId}`,
      {}
    ),
  GetUserCompanies: (username: string): Promise<Company[]> =>
    requests.get(`User/GetUserCompanies?username=${username}`),
  editCompany: (company: Company): Promise<Company> =>
    requests.post(`Company/EditCompany`, company),
  deleteCompany: (companyId: number): Promise<number> =>
    requests.post(`Company/DeleteCompany?companyId=${companyId}`, {}),
};

export const getUserCompanies =
  (username: string): ThunkAction<void, AppState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      dispatch(turnOnLoading());
      dispatch(
        GetUserCompaniesSuccess(await apiActions.GetUserCompanies(username))
      );
      dispatch(turnOffLoading());
    } catch (error) {
      console.error(error);
      dispatch(turnOffLoading());
    }

    function GetUserCompaniesSuccess(companies: Company[]): IUserActionType {
      return {
        type: actionTypes.GET_USER_COMPANIES,
        companies: companies,
      };
    }
  };

export const editCompany =
  (company: Company): ThunkAction<void, AppState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      dispatch(turnOnLoading());
      dispatch(editCompanySuccess(await apiActions.editCompany(company)));
      dispatch(turnOffLoading());
    } catch (error) {
      console.error(error);
      dispatch(turnOffLoading());
    }

    function editCompanySuccess(company: Company): IUserActionType {
      return {
        type: actionTypes.EDIT_COMPANY,
        company: company,
      };
    }
  };

export const deleteCompany =
  (companyId: number): ThunkAction<void, AppState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      dispatch(turnOnLoading());
      dispatch(editCompanySuccess(await apiActions.deleteCompany(companyId)));
      dispatch(turnOffLoading());
    } catch (error) {
      console.error(error);
      dispatch(turnOffLoading());
    }

    function editCompanySuccess(companyId: number): IUserActionType {
      return {
        type: actionTypes.DELETE_COMPANY,
        companyId: companyId,
      };
    }
  };

export const createCompany =
  (
    company: Company,
    username: string
  ): ThunkAction<void, AppState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      dispatch(turnOnLoading());
      dispatch(
        CreateCompany(await apiActions.CreateCompany(company, username))
      );
      dispatch(turnOffLoading());
    } catch (error) {
      console.error(error);
      dispatch(turnOffLoading());
    }

    function CreateCompany(company: Company): IUserActionType {
      return {
        type: actionTypes.CREATE_COMPANY,
        company: company,
      };
    }
  };

export const SaveVerifiedUser =
  (
    verifiedUser: VerifiedUser
  ): ThunkAction<void, AppState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      dispatch(SaveVerifiedUserSuccess(verifiedUser));
    } catch (error) {
      dispatch(toggleNotification(true, "error", "Failed to save user"));
      console.log("ERROR  ---- " + error);
    }

    function SaveVerifiedUserSuccess(
      verifiedUser: VerifiedUser
    ): IUserActionType {
      if (verifiedUser.token) {
        document.cookie = `jwt=` + verifiedUser.token + `;path=/`;
        verifiedUser.username
          ? (document.cookie = `username=` + verifiedUser.username + `; path=/`)
          : dispatch(
              toggleNotification(
                true,
                "error",
                "Token avalible but there is no username"
              )
            );
      }
      return {
        type: actionTypes.USER_LOGIN,
        verifiedUser: verifiedUser,
      };
    }
  };
export const login =
  (loginDto: LoginDto): ThunkAction<void, AppState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      dispatch(turnOnLoading());
      dispatch(loginSuccess(await apiActions.login(loginDto)));
      dispatch(turnOffLoading());
    } catch (error) {
      dispatch(turnOffLoading());
      dispatch(toggleNotification(true, "error", "loginFail"));
      console.log("ERROR  ---- " + error);
    }

    function loginSuccess(verifiedUser: VerifiedUser): IUserActionType {
      if (verifiedUser.token) {
        document.cookie = `jwt=` + verifiedUser.token + `;path=/`;
        verifiedUser.username
          ? (document.cookie = `username=` + verifiedUser.username + `; path=/`)
          : dispatch(
              toggleNotification(
                true,
                "error",
                "Token avalible but there is no username"
              )
            );
      }
      return {
        type: actionTypes.USER_LOGIN,
        verifiedUser: verifiedUser,
      };
    }
  };

export const RegisterUser =
  (user: User): ThunkAction<void, AppState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      dispatch(turnOnLoading());
      await apiActions.register(user);
      dispatch(turnOffLoading());
    } catch (error) {
      dispatch(turnOffLoading());
      dispatch(toggleNotification(true, "error", "loginFail"));
      console.log("ERROR  ---- " + error);
    }
  };

export const logOut =
  (): ThunkAction<void, AppState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      document.cookie.split(";").forEach(function (c) {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      dispatch(logOut());
    } catch (error) {
      dispatch(
        toggleNotification(true, "error", "Something went wrong on logOut")
      );
      console.log(error);
    }

    function logOut(): IUserActionType {
      return {
        type: actionTypes.USER_LOGIN,
        verifiedUser: {
          token: undefined,
          username: undefined,
          roles: undefined,
        },
      };
    }
  };

export const setTokenIfExists =
  (): ThunkAction<void, AppState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("jwt="))
        ?.split("=")[1];
      const username = document.cookie
        .split("; ")
        .find((row) => row.startsWith("username="))
        ?.split("=")[1];
      console.log(token);
      if (token) {
        const jwtData = token.split(".")[1];
        const decodedJwtJsonData = window.atob(jwtData);
        const decodedJwtData = JSON.parse(decodedJwtJsonData);

        const roles = decodedJwtData.role;
        dispatch(dispatchUserInfo(token, username, roles));
      }
    } catch (error) {
      console.error(error);
      dispatch(dispatchUserInfo(undefined, undefined, undefined));
      dispatch(
        toggleNotification(
          true,
          "error",
          "Something went wrong trying to set existing token"
        )
      );
      console.log(error);
    }
  };

export function dispatchUserInfo(
  token: string | undefined,
  username: string | undefined,
  role: string | undefined
): IUserActionType {
  return {
    type: actionTypes.USER_LOGIN,
    verifiedUser: { token: token, username: username, roles: role },
  };
}
