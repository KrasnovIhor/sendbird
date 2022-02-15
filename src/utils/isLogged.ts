export const isLogged = (): boolean => {
	const userData = localStorage.getItem('USER_DATA');
	return !!userData;
};
