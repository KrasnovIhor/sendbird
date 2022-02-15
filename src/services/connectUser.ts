import { SendBirdInstance } from 'sendbird';

export const connectUser = (sbInstance: SendBirdInstance, userId?: string): void => {
	let id: string;

	const userDataString = localStorage.getItem('USER_DATA');

	// if (userDataString) {
	// 	const userData: UserData = JSON.parse(userDataString);
	// 	id = userData.id;
	// } else if (userId) {
	// 	id = userId;
	// }

	id = userDataString ? JSON.parse(userDataString).id : userId;

	try {
		if (id) {
			sbInstance.connect(id, (user, error) => {
				if (error) {
					alert(error.message);
					return error.message;
				}
				localStorage.setItem(
					'USER_DATA',
					JSON.stringify({ id: user.userId, nickname: user.nickname })
				);
			});
		}
	} catch (error) {
		alert(error);
	}
};
