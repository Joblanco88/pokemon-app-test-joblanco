import { fireEvent, screen, waitFor } from '@testing-library/react';
import App from './App';
import { renderWithRouter } from './helpers/renderWith';

describe('renders learn react link', () => {
  const handleClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Verifica se existe os elementos principais na tela Home', () => {
    const { history } = renderWithRouter(<App />);

    const header = screen.getByRole('banner');
    const welcome = screen.getByRole('heading', {
      name: /bem vindo ao app teste com tema do pokémon!/i
    });
    const description = screen.getByRole('heading', {
      name: /esse app tem como objetivo renderizar uma lista de pokémon e poder interagir com ela, adicionando cada pokémon aos seus favoritos ou removê-los da sua lista\./i
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
  test('Verifica os elementos principais na tela List', async () => {
    const { history } = renderWithRouter(<App />);

    await waitFor(() => {
      history.push('/list');
      expect(history.location.pathname).toBe('/list');
    });
    await waitFor(() => {
      const allPoke = screen.getAllByTestId('card-pokemon');
      expect(allPoke).toHaveLength(20);
    });

    const listTitle = screen.getByText('Lista');
    const linkHome = screen.getByRole('link', { name: 'Back to Home'});
    expect(listTitle).toBeInTheDocument();
    expect(linkHome).toBeInTheDocument();
  });
  test('Verifica os pokémon favoritos', async () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('favorites', '[]');
    await waitFor(() => {
      history.push('/list');
    });
    const bulbasaur = await screen.findByRole('button', { value: 'bulbasaur' });
    expect(bulbasaur).toBeInTheDocument();
    fireEvent.click(bulbasaur);
    expect(handleClick).toHaveBeenCalled();
    console.log(localStorage.getItem('favorites'));
    const favoritePokemon = await screen.findByTestId('unfavorite-bulbasaur');
    expect(favoritePokemon).toBeInTheDocument();
  })
});
