import { useOpenChannels } from 'hooks';
import { Container, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Home.module.scss';

export const Home: React.FC = () => {
	const { openChannelCollection } = useOpenChannels();

	return (
		<>
			<Container className={styles.root}>
				<h1>Welcome to ChatUp! application!</h1>
				<h3>Here are all channels available:</h3>
				<ListGroup horizontal>
					{openChannelCollection.map((channel) => (
						<ListGroup.Item key={channel.url}>
							<Link to={`/chat/${channel.url}`}>{channel.name}</Link>
						</ListGroup.Item>
					))}
				</ListGroup>
			</Container>
		</>
	);
};
