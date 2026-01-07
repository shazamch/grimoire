import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastProvider } from './components/ToastProvider'
import { GrimoireProvider } from './provider/GrimoireProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GrimoireProvider theme={{ primary: '#18333E', secondary: '#1987C6' }}>
      <ToastProvider defaultPosition="top-right" defaultDuration={5000}>
        <App />
      </ToastProvider>
    </GrimoireProvider>
  </StrictMode>,
)
