import React from 'react';
import ReactDOM from 'react-dom/client';
import ErrorBoundary from './components/ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AppProvider } from './utils/AppContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary fallback={<p>ErrorBoundary: Something went wrong.</p>}>
        <AppProvider>
          <App />
        </AppProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
