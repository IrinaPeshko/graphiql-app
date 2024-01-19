import ErrorBoundary from '@/components/error-boundary/ErrorBoundary';
import Layout from '@/pages/Layout/Layout';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Layout component', () => {
  beforeEach(() => {
    render(
      <Router>
        <ErrorBoundary>
          <Layout />
        </ErrorBoundary>
      </Router>
    );
  });

  it('renders header', () => {
    const headerElement = screen.getByText('GraphiQL');
    expect(headerElement).toBeInTheDocument();
  });

  it('renders footer', () => {
    const footerElement = screen.getByTestId('rs-logo');
    expect(footerElement).toBeInTheDocument();
  });
});
