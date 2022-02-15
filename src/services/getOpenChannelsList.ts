import SendBird from 'sendbird';

export const getOpenChannelsList = async (
	sbInstance: SendBird.SendBirdInstance
): Promise<SendBird.OpenChannel[]> => {
	const listQuery = sbInstance.OpenChannel.createOpenChannelListQuery();
	let channels: SendBird.OpenChannel[] = [];

	await listQuery.next((openChannels, error) => {
		if (error) {
			alert(error.message);
			return error.message;
		}

		openChannels.forEach((channel) => channels.push(channel));
	});

	return channels;
};
