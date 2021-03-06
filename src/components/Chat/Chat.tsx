import { useContext, useEffect } from 'react';
import { useOpenChannels, useSendbirdInstance } from 'hooks';

import { ChatContext } from 'providers';

import { Messages } from 'components';

import { Col, Container, ListGroup, Row } from 'react-bootstrap';

import styles from './Chat.module.scss';
import { useNavigate, useParams } from 'react-router';

export const Chat: React.FC = () => {
	const { currentOpenChannel } = useContext(ChatContext);
	const { enter } = useSendbirdInstance();
	const { openChannelCollection } = useOpenChannels();
	const navigate = useNavigate();
	const params = useParams();

	const handleSelect = (channel: SendBird.OpenChannel) => {
		if (channel.url !== currentOpenChannel.url) {
			enter(channel.url);

			navigate(`/chat/${channel.url}`);
		}
	};

	useEffect(() => {
		if (params.url) {
			enter(params.url);
		}
	}, [enter, params.url]);

	return (
		<Container className={styles.root}>
			<Row>
				<Col sm={2}>
					<ListGroup as='ul'>
						{openChannelCollection.map((channel) => (
							<ListGroup.Item
								key={channel.url}
								active={currentOpenChannel.url === channel.url}
								onClick={handleSelect.bind(null, channel)}
								as='li'>
								{channel.name}
							</ListGroup.Item>
						))}
					</ListGroup>
				</Col>
				<Col sm={10}>{currentOpenChannel.url && <Messages />}</Col>
			</Row>
		</Container>
	);
};
