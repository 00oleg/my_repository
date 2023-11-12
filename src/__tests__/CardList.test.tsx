import { render } from '@testing-library/react';
import SearchResults from '../components/Result/index';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../utils/AppContext', () => ({
    __esModule: true,
    default: { basename: 'test basename' },
    useContext: jest.fn(),
    useAppContext: () => ({
        results: [
            { uid: 1, name: 'Animal 1', earthAnimal: true },
            { uid: 2, name: 'Animal 2', earthAnimal: false },
        ],
    }),
}));

test('CardList component should render the correct number of cards', () => {
  const { getAllByTestId } = render(
    <MemoryRouter initialEntries={["/"]}>
      <SearchResults loading={false} results={[
        { uid: '1', name: 'Animal 1', earthAnimal: 'true' },
        { uid: '2', name: 'Animal 2', earthAnimal: 'false' },
      ]}/>
    </MemoryRouter>
  );
  const cards = getAllByTestId('card-list__item');
  expect(cards.length).toBe(2);
});

test('CardList component should display a message if no cards are present', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={["/"]}>
      <SearchResults loading={false} results={[]}/>
    </MemoryRouter>
  );
  const noCardsMessage = getByText('No results');
  expect(noCardsMessage).toBeInTheDocument();
});
