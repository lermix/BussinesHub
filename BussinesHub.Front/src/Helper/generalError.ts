import { SetClassNameToClasses } from './jsHelper';

export const setGeneralError = (msg: string) => {
	var paragraph = document.getElementById('ErrorParagraph');
	SetClassNameToClasses('generalErrorHidden', 'generalError');

	(paragraph as any).innerHTML = msg;
	setTimeout(() => {
		(paragraph as any).innerHTML = '';
		SetClassNameToClasses('generalError', 'generalErrorHidden');
	}, 3000);
};
