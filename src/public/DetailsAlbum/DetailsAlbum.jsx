import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useLocation, Link, Navigate } from "react-router-dom";
import { Error, Loading } from "../../components";
import { AppRoutes } from "../../models";
import "./DetailsAlbum.css";

export const DetailsAlbum = () => {
  const location = useLocation();
  const { name, images, id, token, returnTo } = location.state || {};
  const [tracks, setTracks] = useState([]);

  // Si no hay información en location.state, redirigir a home
  if (!location.state || !name || !images || !id || !token) {
    return <Navigate to={AppRoutes.home} />;
  }

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
      <Link to={returnTo || AppRoutes.details} className="button volver" state={{ name, selectedImage: images[0], id, token }}>
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
          {tracks.map((track) => (
            <li key={track.id} className="track">
              <span>{track.track_number}. {track.name}</span>
              <span>{Math.floor(track.duration_ms / 60000)}:{((track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}</span>
            </li>
          ))}
        </ul>
      </section>
      {loading && <Loading />}
      {error && <Error error="Error obteniendo las canciones del álbum" />}
    </main>
  );
};