import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { ChatProvider } from 'providers';

import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<ChatProvider>
				<App />
			</ChatProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
