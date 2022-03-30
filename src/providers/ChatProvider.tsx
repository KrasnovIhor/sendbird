import React, { useEffect, useMemo, useCallback, useState } from 'react';
import SendBird from 'sendbird';

type Props = {
	children: React.ReactElement | React.ReactElement[];
};

export interface IChatContext {
	instance: SendBird.SendBirdInstance;
	connect: (userId?: string) => void;
	enter: (channelUrl: string) => void;
	currentUser: string | null;
	currentOpenChannel: SendBird.OpenChannel;
}

export const ChatContext = React.createContext<IChatContext>({} as IChatContext);

export const ChatProvider = ({ children }: Props): React.ReactElement => {
	const userData = window.localStorage.getItem('USER_DATA');
	const [currentUser, setCurrentUser] = useState(userData);
	const [currentOpenChannel, setCurrentOpenChannel] = useState<SendBird.OpenChannel>(
		{} as SendBird.OpenChannel
	);

	const loadUser = (user: string) => {
		setCurrentUser(user);
		window.localStorage.setItem('USER_DATA', user);
	};

	const instance = useMemo(
		() =>
			new SendBird({
				appId: process.env.REACT_APP_APP_ID as string,
				localCacheEnabled: true,
			}),
		[]
	);

	const connect = useCallback(
		(userId?: string) => {
			let id: string;
			const userDataString = currentUser;
			id = userDataString && !userId ? JSON.parse(userDataString).userId : userId;

			try {
				if (id) {
					instance.connect(id, (user, error) => {
						if (error) {
							alert(error.message);
							return error.message;
						}

						const userString = JSON.stringify({ ...user });

						loadUser(userString);
					});
				}
			} catch (error) {
				alert(error);
			}
		},
		[currentUser, instance]
	);

	const enter = useCallback(
		(channelUrl: string) => {
			instance.OpenChannel.getChannel(channelUrl, (openChannel, error) => {
				if (error) {
					alert(error.message);
					return error.message;
				}
				setCurrentOpenChannel(openChannel);

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
			currentUser,
			currentOpenChannel,
		}),
		[instance, connect, enter, currentUser, currentOpenChannel]
	);

	useEffect(() => {
		if (currentUser) {
			loadUser(currentUser);
		}
	}, [currentUser]);

	return <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>;
};
