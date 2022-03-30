import { FormEvent, ReactElement, useState } from 'react';
import { Button, Col, FormControl, InputGroup, Row } from 'react-bootstrap';
import { useSendbirdInstance } from 'hooks';
import { ChatMessage } from 'types';

import styles from './SendMessage.module.scss';

interface SendMessageProps {
	onSubmit?: (message: ChatMessage | undefined) => void;
}

export const SendMessage: React.FC<SendMessageProps> = ({ onSubmit }): ReactElement => {
	const [message, setMessage] = useState('');
	const { sendUserMessage } = useSendbirdInstance();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const myMessage = await sendUserMessage(message);

		onSubmit?.(myMessage);

		setMessage('');
	};

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<Row>
				<Col sm={10}>
					<InputGroup>
						<FormControl
							onChange={(e) => setMessage(e.target.value)}
							value={message}
							as='input'
							type='text'
							aria-label='With textarea'
						/>
					</InputGroup>{' '}
				</Col>
				<Col sm={2}>
					<Button type='submit' variant='primary'>
						Send
					</Button>
				</Col>
			</Row>
		</form>
	);
};
