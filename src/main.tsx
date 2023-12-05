import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/app/App.tsx'
import './index.css'
import ErrorBoundary from './components/error-boundary/ErrorBoundary.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
