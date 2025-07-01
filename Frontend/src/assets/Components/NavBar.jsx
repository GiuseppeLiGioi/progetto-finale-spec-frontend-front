import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';


export default function NavBar({ searchQuery, setSearchQuery, favoriteIds }) {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link className="navbar-link" to="/">Home</Link>
        <Link className="navbar-link" to="/compare">Comparatore</Link>
      </div>
      <div>
        <div className="favorites-icon-wrapper">
          <Link to="/favorites">
            <FontAwesomeIcon icon={solidStar} className="star-icon" />
            {favoriteIds.length > 0 && (
              <span className="favorites-counter">{favoriteIds.length}</span>
            )}
          </Link>
        </div>

        {<SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />}
      </div>
    </nav>
  );
}
