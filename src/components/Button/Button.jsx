import { Link } from "react-router-dom";
import './Button.css';

export const Button = ({children, text = null, isLink = false, redirectUri = null, fixed = false}) => {
  if (isLink) {
    return (
      <Link to={redirectUri} className={`button ${fixed ? 'fixed-button' : ''}`}>
        {text}
        {children}
      </Link>
    )
  }

  return (
    <button className="button">
      {text}
      {children}
    </button>
  )
}