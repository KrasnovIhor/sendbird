import { ReactElement } from 'react';

import './App.scss';
import { Login } from './components/Login/Login';
import { Navigate, Route, Routes } from 'react-router';
import { Home } from './components/Home/Home';
import { useSendbirdInstance } from './hooks/useSendbirdInstance';

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
