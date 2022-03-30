import { ReactElement } from 'react';
import { useSendbirdInstance } from 'hooks';

import { Navigate, Route, Routes } from 'react-router';

import { Home, Login } from 'views';

import './App.scss';

const App = (): ReactElement => {
	const { currentUser } = useSendbirdInstance();
	const isAuth = !!currentUser;

	return (
		<div className='App'>
			<Routes>
				<Route path='/home' element={isAuth ? <Home /> : <Navigate to='/login' />} />
				<Route path='/' element={isAuth ? <Navigate to='/home' /> : <Navigate to='/login' />} />
				<Route path='/login' element={isAuth ? <Navigate to='/home' /> : <Login />} />
			</Routes>
		</div>
	);
};

export default App;
