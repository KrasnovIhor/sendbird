import { sendMessage } from './../services/sendMessage';
import { ChatContext } from '../providers/ChatProvider';
import { useContext, useCallback } from 'react';
import { getOpenChannelsList } from '../services/getOpenChannelsList';
import { RetrieveMessageHandler, retrieveMessages } from '../services/retrieveMessages';
import { subscribe, Subscriber } from '../services/subscribe';

export const useSendbirdInstance = () => {
	const { connect, instance, enter, currentUser, currentOpenChannel } = useContext(ChatContext);

	const listOpenChannels = useCallback(async () => {
		if (instance) {
			connect();
			return await getOpenChannelsList(instance);
		}
	}, [instance, connect]);

	const subscribeMessages = useCallback(
		(handlerId: string, subscriber: Subscriber) => {
			subscribe(instance, handlerId, subscriber);
		},
		[instance]
	);

	const unsubscribeHandler = useCallback(
		(handlerId: string) => {
			instance.removeChannelHandler(handlerId);
		},
		[instance]
	);

	const loadPrevMessages = useCallback(
		async (channelUrl: string, handler: RetrieveMessageHandler) => {
			if (instance) {
				await retrieveMessages(instance, channelUrl, handler);
			}
		},
		[instance]
	);

	const sendUserMessage = async (message: string) => {
		return await sendMessage(instance, currentOpenChannel, message);
	};

	return {
		connect,
		listOpenChannels,
		enter,
		currentUser,
		sendUserMessage,
		subscribeMessages,
		unsubscribeHandler,
		loadPrevMessages,
	};
};
