export type Subscriber = (
	channel: SendBird.OpenChannel | SendBird.GroupChannel,
	message: SendBird.AdminMessage | SendBird.UserMessage | SendBird.FileMessage
) => void;

export const subscribe = (
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
