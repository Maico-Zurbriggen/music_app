import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const DetailsArtis = () => {
  const location = useLocation();
  const { name, selectedImage, id, token } = location.state;
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      console.log('Token:', token); // Para depuración
      console.log('ID:', id); // Para depuración

      try {
        const response = await fetch(`https://api.spotify.com/v1/artists/${id}/albums`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Datos de álbumes:', data); // Para depuración
        setAlbums(data.items || []);
      } catch (error) {
        console.error('Error al obtener los álbumes:', error);
      }
    };

    if (token && id) {
      fetchAlbums();
    } else {
      console.log('Falta token o ID:', { token, id }); // Para depuración
    }
  }, [id, token]);

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
          {albums && albums.length > 0 ? (
            albums.map((album) => (
              <div key={album.id} className="album-card">
                {album.images && album.images[0] && (
                  <img 
                    src={album.images[0].url}
                    alt={`Portada de ${album.name}`}
                  />
                )}
                <div>
                  <h3>{album.name}</h3>
                  <p>
                    {new Date(album.release_date).getFullYear()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>Cargando álbumes...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsArtis;