import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useLocation, Link, Navigate } from "react-router-dom";
import { Error, Loading } from "../../components";
import { AppRoutes } from "../../models";
import "./DetailsAlbum.css";
import { handleToggleFavoriteTracks } from "../../utils";

export const DetailsAlbum = () => {
  const location = useLocation();
  const { name, images, id, token, returnTo, nameArtist, idArtist, img } = location.state || {};
  const [tracks, setTracks] = useState([]);
  const [favoriteTracks, setFavoriteTracks] = useState(() => {
    return JSON.parse(localStorage.getItem('favoriteTracks') || '[]');
  });

  const modifyFavoriteTracks = (updatedTracks) => {
    setFavoriteTracks(updatedTracks);
  };

  const { data, loading, error } = useFetch({
    url: `https://api.spotify.com/v1/albums/${id}/tracks`,
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    autoFetch: true,
  });

  useEffect(() => {
    if (data) {
      setTracks(data.items);
    }
  }, [data]);

  return (
    <main>
      <Link to={returnTo || AppRoutes.details} className="button volver" state={{ name: nameArtist, selectedImage: img, id: idArtist, token }}>
        Volver
      </Link>
      <header className="header-album">
        {images && images[0] && (
          <img src={images[0].url} alt={`Portada de ${name}`} className="album-img"/>
        )}
        <h1>{name}</h1>
      </header>
      <section>
        <h2>Canciones ({tracks.length})</h2>
        <ul className="list-tracks">
          {tracks.map((track) => {
            const isFavorite = favoriteTracks.some(fav => fav.id === track.id);
            return (
              <li key={track.id} className="track">
                <div className="track-info">
                  <span>{track.track_number}. {track.name}</span>
                  <span>{Math.floor(track.duration_ms / 60000)}:{((track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}</span>
                </div>
                <button 
                  className={`button favorite-track ${isFavorite ? 'is-favorite' : ''}`}
                  onClick={() => handleToggleFavoriteTracks({track, name, images, nameArtist, token, modifyFavoriteTracks})}
                  title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                >
                  <i className={`fa-${isFavorite ? 'solid' : 'regular'} fa-heart`}></i>
                </button>
              </li>
            );
          })}
        </ul>
      </section>
      {loading && <Loading />}
      {error && <Error error="Error obteniendo las canciones del álbum" />}
    </main>
  );
};