import { useState, useEffect } from "react";
import { SearchBar, CardArtist } from "../components";
import axios from "axios";

export const Home = () => {
  const [token, setToken] = useState(null);
  const [artists, setArtists] = useState([]);

  const modifyArtists = (newArtists) => {
    setArtists(newArtists);
  };

  useEffect(() => {
    const getSpotifyToken = async () => {
      try {
        const response = await axios({
          method: "post",
          url: "https://accounts.spotify.com/api/token",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: import.meta.env.VITE_CLIENT_ID,
            client_secret: import.meta.env.VITE_CLIENT_SECRET,
          }),
        });

        return response.data;
      } catch (error) {
        console.error("Error obteniendo token: ", error);
      }
    };

    const fetchToken = async () => {
      const result = await getSpotifyToken();
      setToken(result.access_token);
    };

    fetchToken();
  }, []);

  console.log(artists);

  return (
    <>
      <SearchBar token={token} modifyArtists={modifyArtists} />
      <ul>
        {artists.map((artist) => (
          <CardArtist
            key={artist.id}
            name={artist.name}
            img={artist.images}
            id={artist.id}
            token={token}  // Asegúrate de pasar el token aquí
          />
        ))}
      </ul>
    </>
  );
};
