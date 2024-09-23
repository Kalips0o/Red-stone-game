import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.scss'
import { Home } from './pages/home'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Home />
	</React.StrictMode>
)
