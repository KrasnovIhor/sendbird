import SendBird from 'sendbird';
import { ChatContext } from '../providers/ChatProvider';
import { useContext, useCallback } from 'react';
import { getOpenChannelsList } from '../services/getOpenChannelsList';
import { RetrieveMessageHandler, retrieveMessages } from '../services/retrieveMessages';
import { subscribe, Subscriber } from '../services/subscribe';

export const useSendbirdInstance = () => {
	const { connect, instance, enter, currentUser } = useContext(ChatContext);

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

	return {
		connect,
		listOpenChannels,
		enter,
		currentUser,
		subscribeMessages,
		unsubscribeHandler,
		loadPrevMessages,
	};
};
