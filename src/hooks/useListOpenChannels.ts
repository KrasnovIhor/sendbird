import { getOpenChannelsList } from './../services/getOpenChannelsList';
import { useEffect, useState } from 'react';
import SendBird from 'sendbird';
import { connectUser } from '../services/connectUser';
import { useSendbirdInstance } from './useSendbirdInstance';

export const useListOpenChannels = () => {
	const [channels, setChannels] = useState<SendBird.OpenChannel[]>([]);
	const { connect } = useSendbirdInstance();

	const loadChannels = async (sb: SendBird.SendBirdInstance) => {
		const openChannels = await getOpenChannelsList(sb);

		setChannels(openChannels);
	};

	// useEffect(() => {
	// 	connect();
	// 	// connectUser(sb);
	// 	// loadChannels(sb);
	// }, [connect]);

	return channels;
};
