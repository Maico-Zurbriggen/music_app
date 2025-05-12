import { Link } from 'react-router-dom';
import './AlbumsArtist.css';

export const AlbumsArtist = ({ images, name, releaseDate, id, token }) => {
  return (
    <li className="album-card">
      <Link to={"/detailsAlbum"} state={{ name, images, id, token, returnTo: "/details" }}>
        {images && images[0] && (
          <img src={images[0].url} alt={`Portada de ${name}`} className="album-img"/>
        )}
        <div>
          <h3>{name}</h3>
          <p>{new Date(releaseDate).getFullYear()}</p>
        </div>
      </Link>
    </li>
  );
};
