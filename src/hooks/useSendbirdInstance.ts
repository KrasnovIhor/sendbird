import { ChatContext } from '../providers/ChatProvider';
import { useContext, useCallback } from 'react';
import { getOpenChannelsList } from '../services/getOpenChannelsList';

export const useSendbirdInstance = () => {
	const { connect, instance, enter, currentUser } = useContext(ChatContext);

	const listOpenChannels = useCallback(async () => {
		if (instance) {
			connect();
			return await getOpenChannelsList(instance);
		}
	}, [instance, connect]);

	return { connect, listOpenChannels, enter, currentUser };
};
