import { ChatContext } from 'providers';
import { useCallback, useContext, useEffect } from 'react';
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
			console.log('called');

			instance.removeChannelHandler(handlerId);
		};
	}, [handlerId, instance]);

	return { subscribe };
};
