import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FavoriteTracks.css';

export const FavoriteTracks = () => {
  const [favoriteTracks, setFavoriteTracks] = useState([]);

  useEffect(() => {
    const tracks = JSON.parse(localStorage.getItem('favoriteTracks') || '[]');
    setFavoriteTracks(tracks);
  }, []);

  const handleRemoveFavorite = (trackId) => {
    const newFavorites = favoriteTracks.filter(track => track.id !== trackId);
    localStorage.setItem('favoriteTracks', JSON.stringify(newFavorites));
    setFavoriteTracks(newFavorites);
  };

  return (
    <main className="favorite-tracks-container">
      <Link to="/home" className="button volver">
        Volver
      </Link>
      <h1>Mis Canciones Favoritas</h1>
      <ul className="favorite-tracks-list">
        {favoriteTracks.map((track) => (
          <li key={track.id} className="favorite-track-item">
            <img 
              src={track.albumImage.url} 
              alt={`Portada de ${track.albumName}`} 
              className="track-album-img"
            />
            <div className="track-details">
              <h3>{track.name}</h3>
              <p>{track.artistName} - {track.albumName}</p>
              <p>{Math.floor(track.duration_ms / 60000)}:{((track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}</p>
            </div>
            <button 
              className="button remove-favorite"
              onClick={() => handleRemoveFavorite(track.id)}
              title="Quitar de favoritos"
            >
              <i className="fa-solid fa-heart"></i>
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
};