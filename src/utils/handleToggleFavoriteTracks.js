export const handleToggleFavoriteTracks = ({ track, name, images, nameArtist, token, modifyFavoriteTracks }) => {
  const favorites = JSON.parse(localStorage.getItem("favoriteTracks") || "[]");
  let newFavorites;

  const isTrackFavorite = favorites.some((fav) => fav.id === track.id);

  if (isTrackFavorite) {
    newFavorites = favorites.filter((fav) => fav.id !== track.id);
  } else {
    newFavorites = [
      ...favorites,
      {
        id: track.id,
        name: track.name,
        duration_ms: track.duration_ms,
        albumName: name,
        albumImage: images[0],
        artistName: nameArtist,
        token: token,
      },
    ];
  }

  localStorage.setItem("favoriteTracks", JSON.stringify(newFavorites));
  modifyFavoriteTracks(newFavorites);
};
