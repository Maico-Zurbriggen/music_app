import { useState } from 'react'
import axios from 'axios';

export const SearchBar = ({token, modifyArtists}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const fetchArtist = async () => {
        try {
            const response = await axios({
                method: 'get',
                url: `https://api.spotify.com/v1/search?q=${searchTerm}&type=artist`,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            return response.data;
        } catch (error) {
            console.error("Error obteniendo artista: ", error);
        } finally {
            setSearchTerm("");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await fetchArtist();
        modifyArtists(result.artists.items);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="search-input"
            />
            <button type="submit">
                Search
            </button>
        </form>
    )
}