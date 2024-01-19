import ErrorBoundary from '@/components/error-boundary/ErrorBoundary';
import AuthProvider from '@/providers/AuthProvider';
import LangProvider from '@/providers/LangProvider';
import ThemeProvider from '@/providers/ThemeProvider';
import { routes } from '@/router/router';
import { store } from '@/store/store';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

const useDispatchMock = vi.fn();
const mockDispatch = vi.fn();

const useIdToken = vi.fn();

describe('testing context', () => {
  beforeEach(async () => {
    useDispatchMock.mockReturnValue(mockDispatch);
    useIdToken.mockReturnValue([true, false]);

    const memoryRouter = createMemoryRouter(routes, {
      initialEntries: ['/register'],
    });

    await waitFor(() =>
      render(
        <ErrorBoundary>
          <Provider store={store}>
            <AuthProvider>
              <ThemeProvider>
                <LangProvider>
                  <RouterProvider router={memoryRouter} />
                </LangProvider>
              </ThemeProvider>
            </AuthProvider>
          </Provider>
        </ErrorBoundary>
      )
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('switch theme', async () => {
    expect(document.body.getAttribute('data-theme')).toBe('dark');
    waitFor(() => {
      fireEvent.click(screen.getByTestId('switchTheme-button'));
    });
    expect(document.body.getAttribute('data-theme')).toBe('light');
  });

  it('switch lang', () => {
    expect(screen.getByTestId('auth-title').textContent).toBe('Sign up');

    waitFor(() => {
      fireEvent.click(screen.getByTestId('select-lang'));
    });
    waitFor(async () => {
      fireEvent.click(screen.getByTestId('selectLang-ru'));
    });

    expect(screen.getByTestId('auth-title').textContent).toBe('Регистрация');

    waitFor(() => {
      fireEvent.click(screen.getByTestId('select-lang'));
    });
    waitFor(async () => {
      fireEvent.click(screen.getByTestId('selectLang-en'));
    });

    expect(screen.getByTestId('auth-title').textContent).toBe('Sign up');
  });
});

describe('testing preloader', () => {
  beforeEach(() => {
    useDispatchMock.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('if authorization is loading, the preloader should be shown', async () => {
    const memoryRouter = createMemoryRouter(routes, {
      initialEntries: ['/login'],
    });

    useIdToken.mockReturnValue([false, false]);

    render(
      <ErrorBoundary>
        <Provider store={store}>
          <AuthProvider>
            <ThemeProvider>
              <LangProvider>
                <RouterProvider router={memoryRouter} />
              </LangProvider>
            </ThemeProvider>
          </AuthProvider>
        </Provider>
      </ErrorBoundary>
    );
    expect(screen.getByTestId('preloader-full')).toBeInTheDocument();
  });

  it('if authorization is not loading, the preloader should not be shown', async () => {
    const memoryRouter = createMemoryRouter(routes, {
      initialEntries: ['/login'],
    });
    useIdToken.mockReturnValueOnce([false, false]);

    await waitFor(async () => {
      render(
        <ErrorBoundary>
          <Provider store={store}>
            <AuthProvider>
              <ThemeProvider>
                <LangProvider>
                  <RouterProvider router={memoryRouter} />
                </LangProvider>
              </ThemeProvider>
            </AuthProvider>
          </Provider>
        </ErrorBoundary>
      );
    });

    let isPreloader = true;
    try {
      screen.getByTestId('preloader-full');
      isPreloader = true;
    } catch {
      isPreloader = false;
    }
    expect(isPreloader).toBeFalsy();
  });
});
