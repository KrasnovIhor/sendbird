import { ChatContext } from 'providers';
import { useCallback, useContext, useState, useEffect } from 'react';
import { RetrieveMessageHandler, retrieveMessages } from 'services';
import { ChatMessage } from 'types';

export const useLoadPrevMessages = () => {
	const { instance, currentOpenChannel } = useContext(ChatContext);
	const [prevMessages, setPrevMessages] = useState<ChatMessage[]>([]);

	const loadPrevMessages = useCallback(
		async (handler: RetrieveMessageHandler) => {
			if (instance) {
				await retrieveMessages(instance, currentOpenChannel.url, handler);
			}
		},
		[instance, currentOpenChannel.url]
	);

	useEffect(() => {
		loadPrevMessages((messageList, error) => {
			if (error) {
				alert(error.message);
				return;
			}

			setPrevMessages(messageList);
		});
	}, [loadPrevMessages]);

	return { prevMessages };
};
