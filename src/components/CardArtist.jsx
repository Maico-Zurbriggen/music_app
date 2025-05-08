import { Link } from 'react-router-dom';

export const CardArtist = ({ name, img, id }) => {
  const selectedImage = img[img.length - 1] || img[0];

  return (
    <li>
      <Link to="/details" state={{ name, selectedImage, id }}>
        <h2>{name}</h2>
        <img 
          src={selectedImage.url} 
          width={selectedImage.width} 
          height={selectedImage.height} 
          alt={`Imagen del cantante ${name}`} 
        />
      </Link>
    </li>
  );
}