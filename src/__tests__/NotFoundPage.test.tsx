import { routes } from '@/router/router';
import { store } from '@/store/store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { RouterProvider, createMemoryRouter } from 'react-router-dom';

describe('NotFound component', () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ['/invalid-route'],
  });

  it('renders NotFound', () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });
});
