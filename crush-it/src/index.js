import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { DateProvider } from './components/datecontext';

const root = createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="680743163313-ar6ambpnmgcrl5l1nuilf8vermdic6lv.apps.googleusercontent.com">
    <React.StrictMode>
      <BrowserRouter>
        <DateProvider>
          <App />
        </DateProvider>
      </BrowserRouter>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
