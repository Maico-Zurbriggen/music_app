import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useLocation, Link, Navigate } from "react-router-dom";
import { AlbumsArtist, CardArtist, Error, Loading, Button } from "../../components";
import "./Details.css";
import { AppRoutes } from "../../models";
import { handleToggleFavorite } from "../../utils";

export const Details = () => {
  const location = useLocation();
  const { name, selectedImage, id, token } = location.state || {};
  const [albums, setAlbums] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.some(fav => fav.id === id);
  });

  const modifyIsFavorite = (newIsFavorite) => {
    setIsFavorite(newIsFavorite);
  };

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

  useEffect(() => {
    // Si hay un error 404, redirigir a home
    if (error && error.message.includes('404')) {
      setShouldRedirect(true);
    }
  }, [error]);

  if (shouldRedirect || !location.state || !name || !id || !token) {
    return <Navigate to={AppRoutes.home} />;
  }

  return (
    <main>
      <div className="header-actions">
        <Button text="volver" isLink={true} redirectUri={AppRoutes.home} fixed={true} />
        <button 
          className={`button favorite ${isFavorite ? 'is-favorite' : ''}`}
          onClick={() => handleToggleFavorite({id, isFavorite, modifyIsFavorite, name, selectedImage, token})}
        >
          <i className={`fa-${isFavorite ? 'solid' : 'regular'} fa-heart`}></i>
        </button>
      </div>

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
              nameArtist={name}
              img={selectedImage}
              idArtist={id}
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
