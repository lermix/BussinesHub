import * as actionTypes from './actionTypes'
import { IUserActionType } from './interfaces'

export const turnOnLoading = (): IUserActionType => ({
	type: actionTypes.TURN_ON_MAIN_LOADING,
})

export const turnOffLoading = (): IUserActionType => ({
	type: actionTypes.TURN_OFF_MAIN_LOADING,
})

export const showErrorMessage = (errorMessageTitle: string, errorMessage: string): IUserActionType => ({
	type: actionTypes.SHOW_ERROR_MESSAGE,
	errorMessageTitle: errorMessageTitle,
	errorMessage: errorMessage,
})

export const hideErrorMessage = (): IUserActionType => ({
	type: actionTypes.HIDE_ERROR_MESSAGE,
})
export const toggleNotification = (toggle: boolean, type: 'none' | 'success' | 'error' | 'warning' | 'info', message: string): IUserActionType => ({
	type: actionTypes.NOTIFICATION_TOGGLE,
	notificationIsOpen: toggle,
	notificationType: type,
	notificationMessage: message,
})
