import { FormEvent, ReactElement, useState } from 'react';
import { Button, Col, FormControl, InputGroup, Row } from 'react-bootstrap';

import styles from './SendMessage.module.scss';

export const SendMessage = (): ReactElement => {
	const [message, setMessage] = useState('');

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<Row>
				<Col xs={10}>
					<InputGroup>
						<FormControl
							onChange={(e) => setMessage(e.target.value)}
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
