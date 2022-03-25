import { ReactElement, useEffect, useState } from 'react';
import { useSendbirdInstance } from '../../hooks/useSendbirdInstance';
import { Chat } from '../Chat/Chat';

export const Home = (): ReactElement => {
	const { listOpenChannels } = useSendbirdInstance();
	const [channels, setChannels] = useState<SendBird.OpenChannel[]>([]);

	useEffect(() => {
		const getChannels = async () => {
			const chs = (await listOpenChannels()) as SendBird.OpenChannel[];
			setChannels(chs);
		};

		getChannels();
	}, [listOpenChannels]);

	return (
		<>
			<Chat channels={channels} />
		</>
	);
};
