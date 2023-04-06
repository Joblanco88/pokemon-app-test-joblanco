import { fireEvent, screen } from '@testing-library/react';
import App from './App';
import { renderWithRouter } from './helpers/renderWith';

describe('renders learn react link', () => {
  test('Verifica se existe a imagem correta e o link com redirecionamento correto', () => {
    const { history } = renderWithRouter(<App />);

    const linkElement = screen.getByRole('link', { name: 'Pokémon' });
    const imagePoke = screen.getByRole('img', { alt: 'logo pokémon' });
    expect(linkElement).toBeInTheDocument();
    expect(imagePoke).toBeInTheDocument();
    expect(imagePoke).toHaveAttribute('src', 'pokemonLogo.png');

    fireEvent.click(linkElement);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/list');

  });
});
