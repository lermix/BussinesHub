import { ISharedState, ISharedActionType } from './interfaces'
import * as actionTypes from './actionTypes'

const initialState: ISharedState = {
	showMainLoading: false,
	showErrorMessage: false,
	errorMessageTitle: null,
	errorMessage: null,
	notificationIsOpen: false,
	deleteDialogIsOpen: false,
	deleteDialogAction: null,
	notificationType: 'none',
	notificationMessage: '',
	dialogMessage: '',
}

// REDUCER
export function sharedReducer(state: ISharedState = initialState, action: ISharedActionType): ISharedState {
	switch (action.type) {
		case actionTypes.TURN_ON_MAIN_LOADING:
			return {
				...state,
				showMainLoading: true,
			}
		case actionTypes.TURN_OFF_MAIN_LOADING:
			return {
				...state,
				showMainLoading: false,
			}
		case actionTypes.SHOW_ERROR_MESSAGE:
			return {
				...state,
				showErrorMessage: true,
				errorMessageTitle: action.errorMessageTitle,
				errorMessage: action.errorMessage,
			}
		case actionTypes.HIDE_ERROR_MESSAGE:
			return {
				...state,
				showErrorMessage: false,
				errorMessageTitle: null,
				errorMessage: null,
			}
		case actionTypes.NOTIFICATION_TOGGLE:
			return {
				...state,
				notificationIsOpen: action.notificationIsOpen,
				notificationType: action.notificationType,
				notificationMessage: action.notificationMessage,
			}
		default:
			return state
	}
}
