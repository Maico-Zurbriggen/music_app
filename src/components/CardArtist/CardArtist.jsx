import { Link } from "react-router-dom";
import "./CardArtist.css";

export const CardArtist = ({ name, img, id, token, itemList = true }) => {
  const selectedImage = Array.isArray(img) ? img[img.length - 1] || img[0] : img;

  if (itemList) {
    return (
      <li className="card">
        <Link to="/details" state={{ name, selectedImage, id, token }}>
          <h2 className="name-artist">{name}</h2>
          {selectedImage ? (
            <img
              src={selectedImage.url}
              width={selectedImage.width}
              height={selectedImage.height}
              alt={`Imagen del cantante ${name}`}
              className="imagen-artist"
            />
          ) : (
            <i className="fa-solid fa-user-alt imagen-general"></i>
          )}
        </Link>
      </li>
    );
  }

  return (
    <header className="header-card">
      <h2 className="name-artist">{name}</h2>
      {selectedImage ? (
        <img
          src={selectedImage.url}
          width={selectedImage.width}
          height={selectedImage.height}
          alt={`Imagen del cantante ${name}`}
          className="imagen-artist"
        />
      ) : (
        <i className="fa-solid fa-user-alt imagen-general"></i>
      )}
    </header>
  );
};
