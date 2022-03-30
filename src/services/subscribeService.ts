import { ChatMessage } from 'types';

export type Subscriber = (
	channel: SendBird.OpenChannel | SendBird.GroupChannel,
	message: ChatMessage
) => void;

export const subscribeService = (
	sb: SendBird.SendBirdInstance,
	handlerId: string,
	subscriber: Subscriber
) => {
	const channelHandler = new sb.ChannelHandler();

	channelHandler.onMessageReceived = (channel, message) => {
		subscriber(channel, message);
	};

	sb.addChannelHandler(handlerId, channelHandler);
};
