import { CardArtist } from '../../components';
import './AsideFavorites.css';

export const AsideFavorites = ({favorites, token}) => {
  return (
    <aside className="favorites-sidebar">
      <h2>Artistas Favoritos</h2>
      <ul className="favorites-list">
        {favorites.map((artist) => (
          <CardArtist
            key={artist.id}
            name={artist.name}
            img={[artist.selectedImage]}
            id={artist.id}
            token={token}
            isFavorite={true}
          />
        ))}
      </ul>
    </aside>
  );
};
