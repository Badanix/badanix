import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome CSS
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CurrencyProvider } from './context/CurrencyContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <CurrencyProvider>

    <App />

    </CurrencyProvider>

    </GoogleOAuthProvider>,

  </StrictMode>,
)
