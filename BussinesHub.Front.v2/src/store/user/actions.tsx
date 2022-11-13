import { requests } from "../agent";
import * as actionTypes from "./actionTypes";
import { IUserActionType } from "./interfaces";
import { LoginDto, User, VerifiedUser } from "../../models/User";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../rootReducer";
import { Action } from "redux";

const apiActions = {
  login: (userLogin: LoginDto): Promise<VerifiedUser> =>
    requests.post(`user/Login`, userLogin),
  CheckUserToken: (): Promise<boolean> => requests.get(`user/CheckUserToken`),
  register: (user: User): Promise<void> =>
    requests.post(`User/CreateUser`, user),
};

export const turnOnLoading = (): IUserActionType => ({
  type: actionTypes.TURN_ON_MAIN_LOADING,
});

export const turnOffLoading = (): IUserActionType => ({
  type: actionTypes.TURN_OFF_MAIN_LOADING,
});

export const showErrorMessage = (
  errorMessageTitle: string,
  errorMessage: string
): IUserActionType => ({
  type: actionTypes.SHOW_ERROR_MESSAGE,
  errorMessageTitle: errorMessageTitle,
  errorMessage: errorMessage,
});

export const hideErrorMessage = (): IUserActionType => ({
  type: actionTypes.HIDE_ERROR_MESSAGE,
});
export const toggleNotification = (
  toggle: boolean,
  type: "none" | "success" | "error" | "warning" | "info",
  message: string
): IUserActionType => ({
  type: actionTypes.NOTIFICATION_TOGGLE,
  notificationIsOpen: toggle,
  notificationType: type,
  notificationMessage: message,
});

export const toggleDeleteDialog = (
  toggle: boolean,
  id: number,
  dialogAction?: () => void,
  dialogMessage?: string
): IUserActionType => ({
  type: actionTypes.TOGGLE_DELETE_DIALOG,
  deleteDialogIsOpen: toggle,
  selectedId: id,
  deleteDialogAction: dialogAction,
  dialogMessage: dialogMessage ? dialogMessage : "",
});

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
      if (token) {
        const isUserHasRoles = apiActions.CheckUserToken();

        if (await isUserHasRoles) {
          const jwtData = token.split(".")[1];
          const decodedJwtJsonData = window.atob(jwtData);
          const decodedJwtData = JSON.parse(decodedJwtJsonData);

          const roles = decodedJwtData.role;
          dispatch(dispatchUserInfo(token, username, roles));
        }
      }
    } catch (error) {
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
