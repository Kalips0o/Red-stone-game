import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.scss'
import { Home } from './pages/home'
import { SoundEffects } from './components/SoundEffects'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<SoundEffects />
		<Home />
	</React.StrictMode>
)
