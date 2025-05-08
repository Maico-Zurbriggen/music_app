import { useLocation } from "react-router-dom";

export const Details = () => {
  const { state } = useLocation();
  const { name, img, id } = state;

  return (
    <h1>{name}</h1>
  )
}