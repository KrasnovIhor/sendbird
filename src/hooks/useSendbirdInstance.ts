import { useContext, useCallback } from 'react';

import { ChatContext } from 'providers';

import { retrieveMessages, RetrieveMessageHandler, sendMessage } from 'services';

export const useSendbirdInstance = () => {
	const { connect, instance, enter, currentUser, currentOpenChannel } = useContext(ChatContext);

	const loadPrevMessages = useCallback(
		async (channelUrl: string, handler: RetrieveMessageHandler) => {
			if (instance) {
				await retrieveMessages(instance, channelUrl, handler);
			}
		},
		[instance]
	);

	const sendUserMessage = async (message: string) => {
		try {
			return await sendMessage(instance, currentOpenChannel, message);
		} catch (error: any) {
			alert(error);
		}
	};

	return {
		connect,
		enter,
		currentUser,
		sendUserMessage,
		loadPrevMessages,
	};
};
