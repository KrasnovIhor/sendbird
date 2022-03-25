import { ChatMessage } from '../components/Messages/Messages';

export type RetrieveMessageHandler = (
	messageList: ChatMessage[],
	error: SendBird.SendBirdError
) => void;

export const retrieveMessages = async (
	sb: SendBird.SendBirdInstance,
	channelUrl: string,
	handler: RetrieveMessageHandler
) => {
	const channel = await sb.OpenChannel.getChannel(channelUrl);

	const listQuery = channel.createPreviousMessageListQuery();
	listQuery.limit = 30;
	listQuery.reverse = false;

	listQuery.load((messageList, error) => {
		if (error) {
			alert(error.message);
			return error;
		}

		handler(messageList, error);
	});
};
