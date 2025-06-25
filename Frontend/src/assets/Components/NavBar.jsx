import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';


export default function NavBar({searchQuery, setSearchQuery}) {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link className="navbar-link" to="/">Home</Link>
        <Link className="navbar-link" to="/compare">Comparatore</Link>
      </div>
      <div>
        {<SearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        />}
      </div>
    </nav>
  );
}
