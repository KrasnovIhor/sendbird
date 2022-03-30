export const enterChannel = (sb: SendBird.SendBirdInstance, channelUrl: string) => {
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
