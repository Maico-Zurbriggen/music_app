import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useLocation, Link } from "react-router-dom";
import { AlbumsArtist, CardArtist, Error, Loading } from "../../components";
import "./Details.css";

export const Details = () => {
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
    <main>
      <Link to="/" className="button volver">
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
            />
          ))}
        </ul>
      </section>
      {loading && <Loading />}
      {error && <Error error="Error obteniendo los albumes del artista" />}
    </main>
  );
};
