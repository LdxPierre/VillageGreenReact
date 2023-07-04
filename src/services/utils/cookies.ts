export const setCookie = (name: string, value: string): void => {
	const cookie = document.cookie;
	const newCookie = `${name}=${value}`;
	if (cookie === "") {
		document.cookie = newCookie;
	} else {
		document.cookie = `${document.cookie}; ${newCookie}`;
	}
};

export const getCookie = (name: string): string | null => {
	const tokenString = document.cookie.split(";").find((e) => e.startsWith(`${name}=`));
	const tokenValue = tokenString?.slice(tokenString.indexOf("=") + 1, tokenString.length);
	if (tokenValue) {
		return tokenValue;
	} else {
		return null;
	}
};
