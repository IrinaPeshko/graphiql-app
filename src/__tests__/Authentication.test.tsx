import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from '@/providers/AuthProvider';
import { LangContext } from '@/providers/LangProvider';
import SignUp from '@/pages/SignUp/SignUp';
import Login from '@/pages/Login/Login';
import SignOut from '@/components/SignOut/SignOut';
import { Auth } from 'firebase/auth';

const useDispatchMock = vi.fn();
const mockDispatch = vi.fn();

vi.mock('react-redux', () => ({
  useDispatch: useDispatchMock,
}));

vi.mock('react-redux');

vi.mock('./../store/reducers/userSlice', () => ({
  removeUser: vi.fn(),
}));

vi.mock('firebase/auth', async () => {
  const actual: Auth = await vi.importActual('firebase/auth');
  return {
    ...actual,
    signOut: vi.fn(),
  };
});

describe('SignUp component', () => {
  beforeEach(() => {
    useDispatchMock.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders SignUp component', () => {
    render(
      <Router>
        <AuthContext.Provider value={{ isAuth: false }}>
          <LangContext.Provider value={{ lang: 'en' }}>
            <SignUp />
          </LangContext.Provider>
        </AuthContext.Provider>
      </Router>
    );

    expect(screen.getByText('or sing in using')).toBeInTheDocument();
  });

  it('renders error message if password does not contain special character in SignUp component', async () => {
    const email = 'test@example.com';
    const password = 'password123';

    render(
      <Router>
        <AuthContext.Provider value={{ isAuth: false }}>
          <LangContext.Provider value={{ lang: 'en' }}>
            <SignUp />
          </LangContext.Provider>
        </AuthContext.Provider>
      </Router>
    );

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: email },
    });

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: password },
    });

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(
        screen.getByText(
          'Password must contain at least one special character !@#$%^&*'
        )
      ).toBeInTheDocument();
    });
  });

  it('renders error message if email does not contain an "@" symbol in Login component', async () => {
    const email = 'test';
    const password = 'password123';

    render(
      <Router>
        <AuthContext.Provider value={{ isAuth: false }}>
          <LangContext.Provider value={{ lang: 'en' }}>
            <Login />
          </LangContext.Provider>
        </AuthContext.Provider>
      </Router>
    );

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: email },
    });

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: password },
    });

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(
        screen.getByText(`Email address must contain an '@' symbol`)
      ).toBeInTheDocument();
    });
  });
});

it('renders the button in SignUp component with the provided title', () => {
  const title = 'Sign Out';
  render(
    <Router>
      <SignOut title={title} />
    </Router>
  );

  expect(screen.getByRole('button')).toHaveTextContent(title);
});
