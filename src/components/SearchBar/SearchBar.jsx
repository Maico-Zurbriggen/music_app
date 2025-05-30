import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Error, Loading } from '../../components';
import './SearchBar.css';

export const SearchBar = ({ token, modifyArtists }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, loading, error, fetchData } = useFetch({
    url: `https://api.spotify.com/v1/search?q=${searchTerm}&type=artist`,
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  useEffect(() => {
    if (data) {
      modifyArtists(data.artists.items);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="container-form-search">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="search-input"
          autoComplete="new-password"
          spellCheck="false"
          aria-autocomplete="none"
        />
        <button type="submit" className="button">Search</button>
      </form>
      {loading && <Loading />}
      {error && <Error error="Error obteniendo los artistas" />}
    </>
  );
};
