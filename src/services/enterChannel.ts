import { SendBirdInstance } from 'sendbird';

export const enterChannel = (sb: SendBirdInstance, channelUrl: string) => {
	sb.OpenChannel.getChannel(channelUrl, (openChannel, error) => {
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
};
