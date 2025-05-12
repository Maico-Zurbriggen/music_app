import { Link } from 'react-router-dom';
import './FavoritesList.css';

export const FavoritesList = ({ favorites }) => {
  return (
    <div className="favorites-sidebar">
      <h2>Artistas Favoritos</h2>
      <ul className="favorites-list">
        {favorites.map((artist) => (
          <li key={artist.id}>
            <Link to="/details" state={artist}>
              <div className="favorite-artist">
                {artist.selectedImage ? (
                  <img 
                    src={artist.selectedImage.url} 
                    alt={artist.name}
                    className="favorite-artist-img"
                  />
                ) : (
                  <i className="fa-solid fa-user-alt"></i>
                )}
                <span>{artist.name}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};