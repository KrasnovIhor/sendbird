import React, { useEffect, useMemo, useCallback, useState } from 'react';
import SendBird, { SendBirdInstance } from 'sendbird';

type Props = {
	children: React.ReactElement | React.ReactElement[];
};

export interface IChatContext {
	instance: SendBirdInstance;
	connect: (userId?: string) => void;
	enter: (channelUrl: string) => void;
	loadUserHandler: (user: string) => void;
	currentUser: string | null;
}

export const ChatContext = React.createContext<IChatContext>({} as IChatContext);

export const ChatProvider = ({ children }: Props): React.ReactElement => {
	const userData = window.localStorage.getItem('USER_DATA');
	const [currentUser, setCurrentUser] = useState(userData);

	const loadUser = (user: string) => {
		setCurrentUser(user);
		window.localStorage.setItem('USER_DATA', user);
	};

	const loadUserHandler = useCallback((userToLoad: string) => {
		loadUser(userToLoad);
	}, []);

	const instance = useMemo(
		() =>
			new SendBird({
				appId: process.env.REACT_APP_APP_ID as string,
				localCacheEnabled: true,
			}),
		[]
	);

	const subscribeMessages = (subscriber: () => void) => {
		// create handler
		// attach that handler instance
	};

	const connect = useCallback(
		(userId?: string) => {
			let id: string;
			const userDataString = currentUser;
			id = userDataString && !userId ? JSON.parse(userDataString).id : userId;

			try {
				if (id) {
					instance.connect(id, (user, error) => {
						if (error) {
							alert(error.message);
							return error.message;
						}

						const userString = JSON.stringify({ id: user.userId, nickname: user.nickname });

						loadUserHandler(userString);
					});
				}
			} catch (error) {
				alert(error);
			}
		},
		[loadUserHandler, currentUser, instance]
	);

	const enter = useCallback(
		(channelUrl: string) => {
			instance.OpenChannel.getChannel(channelUrl, (openChannel, error) => {
				if (error) {
					alert(error.message);
					return error.message;
				}

				openChannel.enter((_, error) => {
					if (error) {
						alert(error.message);
						return error.message;
					}
				});
			});
		},
		[instance]
	);

	const contextValue = useMemo(
		() => ({
			instance,
			connect,
			enter,
			loadUserHandler,
			currentUser,
		}),
		[instance, connect, enter, loadUserHandler, currentUser]
	);

	useEffect(() => {
		if (currentUser) {
			loadUserHandler(currentUser);
		}
	}, [currentUser, loadUserHandler]);

	return <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>;
};
