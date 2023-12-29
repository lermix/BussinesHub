import { Action, ThunkAction } from '@reduxjs/toolkit'
import { User } from '../../Models/User'
import * as actionTypes from './actionTypes'
import { ISharedActionType } from './interfaces'
import { AppState } from '../rootReducer'

export const turnOnLoading = (): ISharedActionType => ({
	type: actionTypes.TURN_ON_MAIN_LOADING,
})

export const turnOffLoading = (): ISharedActionType => ({
	type: actionTypes.TURN_OFF_MAIN_LOADING,
})

export const showErrorMessage = (errorMessageTitle: string, errorMessage: string): ISharedActionType => ({
	type: actionTypes.SHOW_ERROR_MESSAGE,
	errorMessageTitle: errorMessageTitle,
	errorMessage: errorMessage,
})

export const hideErrorMessage = (): ISharedActionType => ({
	type: actionTypes.HIDE_ERROR_MESSAGE,
})
export const toggleNotification = (toggle: boolean, type: 'none' | 'success' | 'error' | 'warning' | 'info', message: string): ISharedActionType => ({
	type: actionTypes.NOTIFICATION_TOGGLE,
	notificationIsOpen: toggle,
	notificationType: type,
	notificationMessage: message,
})
