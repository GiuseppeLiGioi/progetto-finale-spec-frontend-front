import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function FavoritesSidebar({ favoriteIds, showSidebar, setShowSidebar, toggleFavorite }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const data = await Promise.all(
          favoriteIds.map(id =>
            fetch(`http://localhost:3001/destinations/${id}`)
              .then(res => res.json())
              .then(data => data.destination)
          )
        );
        setFavorites(data);
      } catch (error) {
        console.error("Errore nel caricamento dei preferiti (sidebar):", error);
      }
    }

    if (favoriteIds.length > 0) {
      fetchFavorites();
    } else {
      setFavorites([]);
      setShowSidebar(false)
    }
  }, [favoriteIds]);

  return (
    <>
      {showSidebar && (
        <div className="sidebar-wrapper">
          <button onClick={() => setShowSidebar(false)} className="btn-close">X</button>
          {favorites.map(f => (
            <div key={f.id} className="single-fav-sidebar">
              <div className="info-side-wrapper">
                <img src={f.img} alt={f.title} />
                <h4>{f.title}</h4>
              </div>
              <div className="btn-fav-wrapper">
                <Link className="btn-sidebar" to={`/destination/${f.id}`}>
                  <FontAwesomeIcon icon={faEye} />
                </Link>
                <button className="btn-sidebar-remove" onClick={() => toggleFavorite(f.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
