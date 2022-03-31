import { useCallback, useContext, useState, useEffect } from 'react';
import { ChatContext } from 'providers';

import { getOpenChannelsList } from 'services';
import { useLocation } from 'react-router';

export const useOpenChannels = () => {
	const { instance, connect } = useContext(ChatContext);
	const location = useLocation();

	const [openChannelCollection, setOpenChannelCollection] = useState<SendBird.OpenChannel[]>([]);

	const listOpenChannels = useCallback(async () => {
		if (instance) {
			connect();

			const chs = await getOpenChannelsList(instance);

			setOpenChannelCollection(chs);
		}
	}, [instance, connect]);

	useEffect(() => {
		listOpenChannels();
	}, [listOpenChannels, location.pathname]);

	return { openChannelCollection };
};
