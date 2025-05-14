import { Link } from 'react-router-dom';
import { AppRoutes } from '../../models';
import './AlbumsArtist.css';

export const AlbumsArtist = ({ images, name, releaseDate, id, token, nameArtist, img, idArtist }) => {
  return (
    <li className="album-card">
      <Link to={AppRoutes.detailsAlbum} state={{ name, images, id, token, nameArtist, img, idArtist, returnTo: "/details" }}>
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
