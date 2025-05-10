import './AlbumsArtist.css';

export const AlbumsArtist = ({ images, name, releaseDate }) => {
  return (
    <li className="card">
      {images && images[0] && (
        <img src={images[0].url} alt={`Portada de ${name}`} className="album-img"/>
      )}
      <div>
        <h3>{name}</h3>
        <p>{new Date(releaseDate).getFullYear()}</p>
      </div>
    </li>
  );
};
