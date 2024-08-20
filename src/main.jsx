import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GistsProvider } from './contexts/gistContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GistsProvider>
      <App />
    </GistsProvider>
  </React.StrictMode>,
)
