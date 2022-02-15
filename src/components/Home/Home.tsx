import { ReactElement, useEffect, useState } from 'react';
import { OpenChannel } from 'sendbird';
import { useSendbirdInstance } from '../../hooks/useSendbirdInstance';
import { Chat } from '../Chat/Chat';

export const Home = (): ReactElement => {
	const { listOpenChannels } = useSendbirdInstance();
	const [channels, setChannels] = useState<OpenChannel[]>([]);

	useEffect(() => {
		const getChannels = async () => {
			const chs = (await listOpenChannels()) as OpenChannel[];
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
