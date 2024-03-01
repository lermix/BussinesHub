import { SetClassNameToClasses } from './jsHelper';

export const setGeneralError = (error: any) => {
	const msg = error.response?.data ? String(error.response?.data) : error.message ? error.message : error;

	const regex = /\[msg\](.*?)\[\/msg\]/;
	const matches = msg.match(regex);

	var paragraph = document.getElementById('ErrorParagraph');
	SetClassNameToClasses('generalErrorHidden', 'generalError');

	if (matches && matches.length > 1) {
		(paragraph as any).innerHTML = matches[1];
	} else {
		(paragraph as any).innerHTML = msg;
	}

	setTimeout(() => {
		(paragraph as any).innerHTML = '';
		SetClassNameToClasses('generalError', 'generalErrorHidden');
	}, 3000);
};
