import React from 'react';
import ReactDOM from 'react-dom/client';
import ErrorBoundary from './components/error-boundary/ErrorBoundary.tsx';
import './styles/global.scss';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import router from './router/router.tsx';
import './utils/firebase.ts';
import { store } from './store/store.ts';
import ThemeProvider from './providers/ThemeProvider.tsx';
import LangProvider from './providers/LangProvider.tsx';
import AuthProvider from './providers/AuthProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <AuthProvider>
          <ThemeProvider>
            <LangProvider>
              <RouterProvider router={router} />
            </LangProvider>
          </ThemeProvider>
        </AuthProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
