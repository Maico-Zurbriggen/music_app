import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useLocation, Link, Navigate } from "react-router-dom";
import { AlbumsArtist, CardArtist, Error, Loading } from "../../components";
import "./Details.css";
import { AppRoutes } from "../../models";

export const Details = () => {
  const location = useLocation();
  const { name, selectedImage, id, token } = location.state || {};
  const [albums, setAlbums] = useState([]);

  // Si no hay información en location.state, redirigir a home
  if (!location.state || !name || !id || !token) {
    return <Navigate to={AppRoutes.home} />;
  }

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
    <main>
      <Link to={AppRoutes.home} className="button volver">
        Volver
      </Link>
      <CardArtist
        name={name}
        img={selectedImage}
        id={id}
        token={token}
        itemList={false}
      />
      <section>
        <h2>Álbumes ({albums.length})</h2>
        <ul className="list-albums">
          {albums.map((album) => (
            <AlbumsArtist
              key={album.id}
              name={album.name}
              images={album.images}
              releaseDate={album.release_date}
              id={album.id}
              token={token}
            />
          ))}
        </ul>
      </section>
      {loading && <Loading />}
      {error && <Error error="Error obteniendo los albumes del artista" />}
    </main>
  );
};
