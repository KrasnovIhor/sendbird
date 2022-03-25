import { ReactElement, useState } from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import SendBird from 'sendbird';
import { useSendbirdInstance } from '../../hooks/useSendbirdInstance';
import { Messages } from '../Messages/Messages';

import styles from './Chat.module.scss';

interface ChatProps {
	channels: SendBird.OpenChannel[];
}

export const Chat = ({ channels }: ChatProps): ReactElement => {
	const [currentChannel, setCurrentChannel] = useState({} as SendBird.OpenChannel);
	const { enter } = useSendbirdInstance();

	const handleSelect = async (channel: SendBird.OpenChannel) => {
		if (channel.url !== currentChannel.url) {
			setCurrentChannel(channel);
			enter(channel.url);
		}
	};
	return (
		<Container className={styles.root}>
			<Row>
				<Col xs={2}>
					<ListGroup as='ul'>
						{channels.map((channel) => (
							<ListGroup.Item
								key={channel.url}
								active={currentChannel.url === channel.url}
								onClick={handleSelect.bind(null, channel)}
								as='li'>
								{channel.name}
							</ListGroup.Item>
						))}
					</ListGroup>
				</Col>
				<Col xs={10}>
					<Messages channel={currentChannel} />
				</Col>
			</Row>
		</Container>
	);
};
