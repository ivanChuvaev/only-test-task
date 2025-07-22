import { createRoot } from 'react-dom/client'
import App from './App'
import { StrictMode } from 'react'
import 'normalize.css'
import '@/shared/assets/styles/globals.scss'

const root = createRoot(document.querySelector('#root')!)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
