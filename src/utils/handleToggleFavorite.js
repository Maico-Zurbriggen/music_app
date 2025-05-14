export const handleToggleFavorite = ({ id, isFavorite, modifyIsFavorite, name, selectedImage, token }) => {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  let newFavorites;

  if (isFavorite) {
    newFavorites = favorites.filter((fav) => fav.id !== id);
  } else {
    newFavorites = [...favorites, { id, name, selectedImage, token }];
  }

  localStorage.setItem("favorites", JSON.stringify(newFavorites));
  modifyIsFavorite(!isFavorite);
};
