import { User } from '../Models/User';

export const GetUserFromLocal = (): User | null => {
	const email: string | null = localStorage.getItem('UserEmail');
	const name: string | null = localStorage.getItem('UserName');
	const username: string | null = localStorage.getItem('UserUsername');
	const surname: string | null = localStorage.getItem('UserSurname');
	if (!username) return null;

	return {
		email: email,
		name: name,
		username: username,
		surname: surname,
	} as User;
};

export const SaveUserToLocal = (user: User) => {
	localStorage.setItem('UserEmail', user.email),
		localStorage.setItem('UserName', user.name),
		localStorage.setItem('UserUsername', user.username),
		localStorage.setItem('UserSurname', user.surname);
	window.dispatchEvent(new Event('storage'));
};

export const IsUserInLocal = (): boolean => {
	if (localStorage.getItem('UserName')) return true;
	else return false;
};

export const RemoveUserFromLocal = () => {
	localStorage.removeItem('UserEmail'),
		localStorage.removeItem('UserName'),
		localStorage.removeItem('UserUsername'),
		localStorage.removeItem('UserSurname');

	window.dispatchEvent(new Event('storage'));
};
