import { Action, ThunkAction } from '@reduxjs/toolkit';
import * as actionTypes from './actionTypes';
import { ISharedActionType } from './interfaces';
import { AppState } from '../rootReducer';
import { ApiCompany } from '../../Api/CompanyController';
import { Category } from '../../Models/Category';

export const GetCategoriesForCompany =
	(companyId: number): ThunkAction<void, AppState, unknown, Action<string>> =>
	async (dispatch) => {
		try {
			dispatch(turnOnLoading());
			dispatch(getCompanyCategoriesSuccess(await ApiCompany.getCompanyCategories(companyId)));
			dispatch(turnOffLoading());
		} catch (error) {
			dispatch(turnOffLoading());
			console.log(error);
		}

		function getCompanyCategoriesSuccess(categories: Category[]): ISharedActionType {
			return {
				type: actionTypes.GET_COMPANY_CATEGORIES,
				categories: categories,
			};
		}
	};

export const turnOnLoading = (): ISharedActionType => ({
	type: actionTypes.TURN_ON_MAIN_LOADING,
});

export const turnOffLoading = (): ISharedActionType => ({
	type: actionTypes.TURN_OFF_MAIN_LOADING,
});

export const showErrorMessage = (errorMessageTitle: string, errorMessage: string): ISharedActionType => ({
	type: actionTypes.SHOW_ERROR_MESSAGE,
	errorMessageTitle: errorMessageTitle,
	errorMessage: errorMessage,
});

export const hideErrorMessage = (): ISharedActionType => ({
	type: actionTypes.HIDE_ERROR_MESSAGE,
});
export const toggleNotification = (toggle: boolean, type: 'none' | 'success' | 'error' | 'warning' | 'info', message: string): ISharedActionType => ({
	type: actionTypes.NOTIFICATION_TOGGLE,
	notificationIsOpen: toggle,
	notificationType: type,
	notificationMessage: message,
});
