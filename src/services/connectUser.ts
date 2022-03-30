export const connectUser = (sbInstance: SendBird.SendBirdInstance, userId?: string): void => {
	let id: string;

	const userDataString = localStorage.getItem('USER_DATA');

	id = userDataString ? JSON.parse(userDataString).userId : userId;

	try {
		if (id) {
			sbInstance.connect(id, (user, error) => {
				if (error) {
					alert(error.message);
					return error.message;
				}
				localStorage.setItem('USER_DATA', JSON.stringify({ ...user }));
			});
		}
	} catch (error) {
		alert(error);
	}
};
