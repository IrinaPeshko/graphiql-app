import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer/Footer';

describe('Footer component', () => {
  it('renders the correct GitHub links', () => {
    render(<Footer />);

    const githubLinks = screen.queryAllByRole('link', {
      name: /Irina Peshko|Anastasia Shishmareva|Mariya Pyzh/i,
    });

    expect(githubLinks).toHaveLength(3);
    expect(githubLinks[0].getAttribute('href')).toBe(
      'https://github.com/IrinaPeshko'
    );
    expect(githubLinks[1].getAttribute('href')).toBe(
      'https://github.com/Nastasyma'
    );
    expect(githubLinks[2].getAttribute('href')).toBe(
      'https://github.com/maria-kashpur'
    );
  });

  test('renders the correct RS logo', () => {
    render(<Footer />);

    const rsLogo = screen.getByTestId('rs-logo');

    expect(rsLogo).toBeInTheDocument();
  });
});
