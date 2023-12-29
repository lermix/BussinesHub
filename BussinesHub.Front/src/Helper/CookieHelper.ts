import { User, VerifiedUser } from '../Models/User';
import { setGeneralError } from './generalError';

export const saveVerifiedUserAsCookie = (verifiedUser: VerifiedUser) => {
	document.cookie = `jwt=` + verifiedUser.token + `;path=/`;
	verifiedUser.username
		? (document.cookie = `username=` + verifiedUser.username + `; path=/`)
		: setGeneralError('Token avalible but there is no username');
};

export const deleteVerifiedUserAsCookie = () => {
	document.cookie = 'jwt=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
	document.cookie = 'username=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};
