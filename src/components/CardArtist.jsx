import { Link } from 'react-router-dom';

export const CardArtist = ({ name, img, id, token }) => {
  const selectedImage = img[img.length - 1] || img[0];

  return (
    <li>
      <Link to="/details" state={{ name, selectedImage, id, token }}>
        <h2>{name}</h2>
        {selectedImage ? <img 
          src={selectedImage.url} 
          width={selectedImage.width} 
          height={selectedImage.height} 
          alt={`Imagen del cantante ${name}`} 
        /> : <i className='fa-solid fa-user-alt imagen-general'></i>}
      </Link>
    </li>
  );
}