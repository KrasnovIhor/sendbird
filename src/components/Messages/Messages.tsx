import { ReactElement, useCallback, useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import SendBird from 'sendbird';
import { useSendbirdInstance } from '../../hooks/useSendbirdInstance';

import styles from './Messages.module.scss';

interface MessagesProps {
	channelUrl: string;
}

export const Messages = ({ channelUrl }: MessagesProps): ReactElement => {
	const { connect } = useSendbirdInstance();
	const [openChannel, setOpenChannel] = useState({} as SendBird.OpenChannel);
	const [messages, setMessages] = useState<any[]>([]);

	useEffect(() => {}, [channelUrl]);

	return (
		<div className={styles.root}>
			<Image src={openChannel.coverUrl} alt='open channel cover image' />
		</div>
	);
};
