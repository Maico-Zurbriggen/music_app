import { useState, useEffect } from "react";
import { SearchBar, CardArtist, Loading, Error } from "../../components";
import { useFetch } from "../../hooks/useFetch";
import './Home.css';

const datos = new URLSearchParams({
  grant_type: "client_credentials",
  client_id: import.meta.env.VITE_CLIENT_ID,
  client_secret: import.meta.env.VITE_CLIENT_SECRET,
}).toString();

export const Home = () => {
  const [token, setToken] = useState(null);
  const [artists, setArtists] = useState([]);

  const modifyArtists = (newArtists) => {
    setArtists(newArtists);
  };

  const { data, loading, error } = useFetch({
    url: "https://accounts.spotify.com/api/token",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    datos: datos,
    autoFetch: true
  })

  useEffect(() => {
    if (data) {
      setToken(data.access_token);
    }
  }, [data]);

  return (
    <main className="container-home">
      <SearchBar token={token} modifyArtists={modifyArtists} />
      <ul className="list-artists">
        {artists.map((artist) => (
          <CardArtist
            key={artist.id}
            name={artist.name}
            img={artist.images}
            id={artist.id}
            token={token}
          />
        ))}
      </ul>
      {loading && <Loading />}
      {error && <Error error="Error obteniendo el token" />}
    </main>
  );
};
