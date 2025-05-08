import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Error, Loading } from "../components";
import { useFetch } from "../hooks/useFetch";

export const DetailsArtis = () => {
  const location = useLocation();
  const { name, selectedImage, id, token } = location.state;
  const [albums, setAlbums] = useState([]);

  const { data, loading, error } = useFetch({
    url: `https://api.spotify.com/v1/artists/${id}/albums`,
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    autoFetch: true,
  });

  useEffect(() => {
    if (data) {
      setAlbums(data.items);
    }
  }, [data]);

  return (
    <div>
      <Link to="/">
        <i className="fa-solid fa-arrow-left"></i> Volver
      </Link>

      <div>
        <h1>{name}</h1>
        {selectedImage && (
          <img
            src={selectedImage.url}
            alt={`Imagen de ${name}`}
            className="artist-image"
          />
        )}
      </div>

      <div>
        <h2>Álbumes ({albums.length})</h2>
        <div className="albums-grid">
          {albums.map((album) => (
            <div key={album.id} className="album-card">
              {album.images && album.images[0] && (
                <img
                  src={album.images[0].url}
                  alt={`Portada de ${album.name}`}
                />
              )}
              <div>
                <h3>{album.name}</h3>
                <p>{new Date(album.release_date).getFullYear()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {loading && <Loading />}
      {error && <Error error="Error obteniendo los albumes del artista" />}
    </div>
  );
};

export default DetailsArtis;
