import { useState, useEffect } from "react";
import {
  SearchBar,
  CardArtist,
  Loading,
  Error,
  Button,
  AsideFavorites
} from "../../components";
import { useFetch } from "../../hooks/useFetch";
import { AppRoutes } from "../../models";
import "./Home.css";

const datos = new URLSearchParams({
  grant_type: "client_credentials",
  client_id: import.meta.env.VITE_CLIENT_ID,
  client_secret: import.meta.env.VITE_CLIENT_SECRET,
}).toString();

export const Home = () => {
  const [token, setToken] = useState(null);
  const [artists, setArtists] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  });

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
    autoFetch: true,
  });

  useEffect(() => {
    if (data) {
      setToken(data.access_token);
    }
  }, [data]);

  return (
    <div className="home-layout">
      <main className="container-home">
        <Button isLink={true} redirectUri={AppRoutes.favoriteTracks} fixed={true}>
          <i className="fa-solid fa-music"></i>
        </Button>
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

      {/* Solo mostrar el sidebar si hay favoritos */}
      {favorites.length > 0 && (
        <AsideFavorites favorites={favorites} token={token} />
      )}
    </div>
  );
};
