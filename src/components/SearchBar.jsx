import { useState } from 'react'

export const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        // Here you can handle the search submission
        console.log('Search term:', searchTerm)
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