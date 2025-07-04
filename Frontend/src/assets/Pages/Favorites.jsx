import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
export default function Favorites({ favoriteIds, toggleFavorite }) {

    const [favoriteDestinations, setFavoriteDestinations] = useState([]);

    const [openIds, setOpenIds] = useState([]);

    function toggleAccordion(id) {
        if (openIds.includes(id)) {
            setOpenIds(openIds.filter(openId => openId !== id));
        } else {
            setOpenIds([...openIds, id]);
        }
    }


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
        setFavoriteDestinations(data);
      } catch (error) {
        console.error("Errore nel caricamento delle destinazioni preferite:", error);
      }
    }

    if (favoriteIds.length > 0) {
      fetchFavorites();
    } else {
      setFavoriteDestinations([]);
    }
  }, [favoriteIds]);



    if (favoriteDestinations.length === 0) {
        return <p className="info-error">Nessuna Destinazione Aggiunta ai Preferiti!"</p>
    }




    return (
        
        <div className="favorites-wrapper">

            {

                favoriteDestinations.map((f) => {
                    const isOpen = openIds.includes(f.id);
                    return (
                        <div key={f.id} className="single-dest-fav">
                            <div className="fav-header" onClick={() => toggleAccordion(f.id)}>
                                <img className="fav-img" src={f.img} alt={f.title} />
                                <h5 className="fav-title">{f.title}</h5>
                                <div className="fav-right-info">
                                    <span className="fav-category">{f.category.toUpperCase()}</span>
                                    <span className="fav-price">{`${f.averageCost}€`}</span>
                                </div>
                                <button onClick={() => toggleFavorite(f.id)} className="btn-fav">
                                    Rimuovi
                                </button>
                            </div>

                            {isOpen && (
                                <div className="fav-details">
                                    <p className="fav-p"><strong>Paese:</strong> <span className="fav-span">{f.country}</span></p>
                                    <p className="fav-p"><strong>Lingua Parlata:</strong> <span className="fav-span">{f.language}</span></p>
                                    <p className="fav-p"><strong>Attività consigliate:</strong> <span className="fav-span">{f.activities.join(", ")}</span></p>
                                    <p className="fav-p"><strong>Stagione consigliata:</strong> <span className="fav-span">{f.recommendedSeason}</span></p>
                                    <p className="fav-p"><strong>Clima :</strong> <span className="fav-span">{f.climate}</span></p>
                                </div>
                            )}

                        </div>
                    );
                })
            }
           <div className="wrapper-btn-home">

            <Link to="/" className="btn-home">Torna alla Home</Link>
           </div>

        </div>
    )
}