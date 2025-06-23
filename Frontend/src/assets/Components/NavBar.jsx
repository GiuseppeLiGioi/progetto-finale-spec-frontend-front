import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link className="navbar-link" to="/">Home</Link>
        <Link className="navbar-link" to="/compare">Comparatore</Link>
      </div>
    </nav>
  );
}
