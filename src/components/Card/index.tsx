import { Link } from 'react-router-dom';

interface SearchResultItem {
  uid: string;
  name: string;
  earthAnimal: string;
}

const Card = ({ uid, name, earthAnimal }: SearchResultItem) => {
  return (
    <div 
      className='card-list__item'
      data-testid="card-list__item"
    >
      <Link 
        to={`/${uid}?detail=${uid}`}
        data-testid="card-list__item-link"
      >
        <strong>{name}</strong> -
        <span data-testid="card-list__item-earth">Earth Animal: {earthAnimal ? 'Yes' : 'No'}</span>
      </Link>
    </div>
  );
}

export default Card;
