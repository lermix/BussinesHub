import { SetClassNameToClasses } from './jsHelper';

export const setGeneralError = (error: any) => {
	const msg = error.response?.data ? String(error.response?.data) : error.message ? error.message : error;
	var paragraph = document.getElementById('ErrorParagraph');
	SetClassNameToClasses('generalErrorHidden', 'generalError');

	(paragraph as any).innerHTML = msg;
	setTimeout(() => {
		(paragraph as any).innerHTML = '';
		SetClassNameToClasses('generalError', 'generalErrorHidden');
	}, 3000);
};
