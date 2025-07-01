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
        async function fetchFavoriteDestinations() {
            try {
                const res = await fetch('http://localhost:3001/destinations')
                if (!res.ok) {
                    throw new Error(`Errore nel fetch delle destinazioni: ${res.status} ${res.statusText}`)
                }
                const data = await res.json()
                //console.log("Dati ricevuti:", data);
                setFavoriteDestinations(data.filter((d) => favoriteIds.includes(d.id)))

            } catch (error) {
                console.error(error)
            }
        }
        fetchFavoriteDestinations()

    }, [favoriteIds])



    if (favoriteDestinations.length === 0) {
        return <p>Nessuna Destinazione Aggiunta ai Preferiti</p>
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