import { ReactElement } from 'react';
import { useSendbirdInstance } from 'hooks';

import { Navigate, Route, Routes } from 'react-router';

import { Home, Login } from 'views';
import { Chat } from 'components';

import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './App.scss';

import logo from 'assets/images/sendbird_1550867069.png';

const App = (): ReactElement => {
	const { currentUser } = useSendbirdInstance();
	const isAuth = !!currentUser;

	return (
		<div className='App'>
			<Navbar bg='dark' variant='dark'>
				<Container>
					<Link className='home-link' to='/home'>
						<img
							alt=''
							src={logo}
							width='30'
							height='30'
							className='d-inline-block align-top me-2'
						/>
						ChatUp!
					</Link>
				</Container>
			</Navbar>{' '}
			<Routes>
				<Route path='/home' element={isAuth ? <Home /> : <Navigate to='/login' />} />
				<Route path='/' element={isAuth ? <Navigate to='/home' /> : <Navigate to='/login' />} />
				<Route path='/login' element={isAuth ? <Navigate to='/home' /> : <Login />} />
				<Route path='/chat/:url' element={<Chat />} />
			</Routes>
		</div>
	);
};

export default App;
