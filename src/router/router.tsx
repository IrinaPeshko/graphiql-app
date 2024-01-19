import { createBrowserRouter } from 'react-router-dom';
import Main from '../pages/Main/Main';
import SignUp from '../pages/SignUp/SignUp';
import Login from '../pages/Login/Login';
import Layout from '../pages/Layout/Layout';
import NotFound from '../pages/404/NotFound';
import Welcome from '../pages/Welcome/Welcome';

export const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: 'welcome',
        element: <Welcome />,
      },
      {
        path: 'register',
        element: <SignUp />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
