import { MemoryRouter } from 'react-router-dom';
import Card from '../components/Card';
import { render} from '@testing-library/react';

test('Card component should render the card data', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={["/"]}>
      <Card {...{ uid: '1', name: 'Animal 1', earthAnimal: 'true' }} />
    </MemoryRouter>
  );

  const name = getByText('Animal 1');
  expect(name).toBeInTheDocument();
  const earth = getByText('Earth Animal: Yes');
  expect(earth).toBeInTheDocument();
});
