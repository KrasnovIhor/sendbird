import { FormEvent, ReactElement, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSendbirdInstance } from 'hooks';
import styles from './Login.module.scss';

export const Login = (): ReactElement => {
	const [userId, setUserId] = useState<string>('');
	const { connect } = useSendbirdInstance();
	const navigate = useNavigate();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		connect(userId);
		navigate('/');
	};

	return (
		<Container className={styles.root}>
			<Form onSubmit={handleSubmit}>
				<Form.Group className='mb-3' controlId='userId'>
					<Form.Label>User ID</Form.Label>
					<Form.Control
						value={userId}
						onChange={(e) => setUserId(e.target.value)}
						type='text'
						placeholder='Enter user ID'
					/>
				</Form.Group>{' '}
				<Button variant='primary' type='submit'>
					Login
				</Button>
			</Form>
		</Container>
	);
};
