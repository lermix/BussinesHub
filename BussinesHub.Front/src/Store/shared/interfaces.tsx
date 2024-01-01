import { Category } from '../../Models/Category';
import { User } from '../../Models/User';
import * as actionTypes from './actionTypes';

// STATE
export interface ISharedState {
	showMainLoading: boolean;
	showErrorMessage: boolean;
	errorMessageTitle: string | null;
	errorMessage: string | null;
	deleteDialogIsOpen: boolean;
	notificationIsOpen: boolean;
	notificationType: 'none' | 'success' | 'error' | 'warning' | 'info';
	notificationMessage: string;
	deleteDialogAction: any;
	dialogMessage: string;
	companyCategories: Category[];
}

// ACTIONS
interface ITurnOnMainLoadingAction {
	type: typeof actionTypes.TURN_ON_MAIN_LOADING;
}

interface ITurnOffMainLoadingAction {
	type: typeof actionTypes.TURN_OFF_MAIN_LOADING;
}

interface IShowErrorAction {
	type: typeof actionTypes.SHOW_ERROR_MESSAGE;
	errorMessageTitle: string;
	errorMessage: string;
}

interface IHideErrorAction {
	type: typeof actionTypes.HIDE_ERROR_MESSAGE;
}
interface IToggleNotificationAction {
	type: typeof actionTypes.NOTIFICATION_TOGGLE;
	notificationIsOpen: boolean;
	notificationType: 'none' | 'success' | 'error' | 'warning' | 'info';
	notificationMessage: string;
}

interface IGetCompanyCategories {
	type: typeof actionTypes.GET_COMPANY_CATEGORIES;
	categories: Category[];
}

export type ISharedActionType =
	| ITurnOnMainLoadingAction
	| ITurnOffMainLoadingAction
	| IShowErrorAction
	| IHideErrorAction
	| IToggleNotificationAction
	| IGetCompanyCategories;
