import { useCallback, useContext, useEffect } from 'react';
import { ChatContext } from 'providers';
import { subscribeService, Subscriber } from 'services';

export const useSubscription = (handlerId: string) => {
	const { instance } = useContext(ChatContext);

	const subscribe = useCallback(
		(subscriber: Subscriber) => {
			subscribeService(instance, handlerId, subscriber);
		},
		[handlerId, instance]
	);

	useEffect(() => {
		return () => {
			instance.removeChannelHandler(handlerId);
		};
	}, [handlerId, instance]);

	return { subscribe };
};
