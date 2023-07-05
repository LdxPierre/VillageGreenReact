export const getCookie = (name: string): string | null => {
	const cookie = document.cookie.split(";").find((e) => e.startsWith(`${name}=`));
	const cookieValue = cookie?.slice(cookie.indexOf("=") + 1, cookie.length);
	if (cookieValue) {
		return cookieValue;
	} else {
		return null;
	}
};

export const setCookie = (name: string, value: string, exdays: number): void => {
	const expDate = new Date();
	expDate.setTime(expDate.getTime() + exdays * 24 * 60 * 60 * 1000);
	const newCookie = `${name}=${value};expires=${expDate.toUTCString()};path=/`;
	document.cookie = newCookie;
};
