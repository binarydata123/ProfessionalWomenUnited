export const setRedirectUrl = key => {
	const currentUrl = window.location.href;
	const redirectUrl = window.sessionStorage.setItem(key, currentUrl);
	if (redirectUrl) {
		return true;
	}
	return false;
};

export const setSessionData = (key, value) => {
	const data = window.sessionStorage.setItem(key, value);
	if (data) {
		return true;
	}
	return false;
};

export const getSessionData = key => {
	const data = window.sessionStorage.getItem(key);
	if (data) {
		return JSON.parse(data);
	}
	return false;
};

export const removeSessionData = key => {
	const remove = window.sessionStorage.removeItem(key);
	if (remove) {
		return true;
	}
	return false;
};
