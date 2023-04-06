import { fireEvent, screen } from '@testing-library/react';
import App from './App';
import { renderWithRouter } from './helpers/renderWith';
import List from './pages/List';
import { act } from 'react-dom/test-utils';

describe('renders learn react link', () => {
  test('Verifica se existe os elementos principais na tela Home', () => {
    const { history } = renderWithRouter(<App />);

    const header = screen.getByRole('banner');
    const welcome = screen.getByRole('heading', {
      name: /bem vindo ao app teste com tema do pokémon!/i
    });
    const description = screen.getByRole('heading', {
      name: /esse app tem como objetivo renderizar uma lista de pokémon e poder interagir com ela, adicionando cada pokémon aos seus favoritos ou removê\-los da sua lista\./i
    })
    const button = screen.getByRole('button', { name: 'Pokémon'});
    const links = screen.getByText(/clique no botão ou no link para começar sua experiência!/i);

    expect(header).toBeInTheDocument();
    expect(welcome).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(links).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');
  });
  test('Verifica se existe a imagem correta e o link com redirecionamento correto na tela Home', () => {
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
  test('Verifica os elementos principais na tela List', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/list');
    })
    expect(history.location.pathname).toBe('/list');
  })
});
