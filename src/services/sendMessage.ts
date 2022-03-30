import { ChatMessage } from 'types';

export const sendMessage = async (
	sb: SendBird.SendBirdInstance,
	channel: SendBird.OpenChannel,
	message: string
): Promise<ChatMessage> => {
	const params = new sb.UserMessageParams();

	params.message = message;

	return new Promise((resolve, reject: (error: SendBird.SendBirdError) => void) => {
		channel.sendUserMessage(params, (userMessage, error) => {
			if (error) reject(error);

			resolve(userMessage);
		});
	});
};
