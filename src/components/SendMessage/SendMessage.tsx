import { FormEvent, ReactElement, useState } from 'react';
import { Button, Col, FormControl, InputGroup, Row } from 'react-bootstrap';
import { useSendbirdInstance } from '../../hooks/useSendbirdInstance';

import styles from './SendMessage.module.scss';

export const SendMessage = (): ReactElement => {
	const [message, setMessage] = useState('');
	const { sendUserMessage } = useSendbirdInstance();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await sendUserMessage(message);
		setMessage('');
	};

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<Row>
				<Col xs={10}>
					<InputGroup>
						<FormControl
							onChange={(e) => setMessage(e.target.value)}
							value={message}
							as='textarea'
							aria-label='With textarea'
						/>
					</InputGroup>{' '}
				</Col>
				<Col xs={2}>
					<Button type='submit' variant='primary'>
						Send
					</Button>
				</Col>
			</Row>
		</form>
	);
};
