import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function DestinationPage({ selectedIds, toggleSelect, favoriteIds, toggleFavorite}) {
    const {id} = useParams();
    const [destination, setDestination] = useState("")
    


   useEffect(() => {
    async function fetchDestination() {
      try {
        const res = await fetch(`http://localhost:3001/destinations/${id}`);
        if (!res.ok) throw new Error("Errore nel fetch");
        const data = await res.json();
        setDestination(data.destination); 
      } catch (error) {
        console.error("Errore nel caricamento della destinazione:", error);
      }
    }
    fetchDestination();
  }, [id]);
   

    
  if (!destination) {
    return <p className="info-error">Caricamento in Corso..."</p>
  }

  const isSelected = selectedIds.includes(destination.id);
  

    return (
        <div className="destination-wrapper">
        <h1 className="destination-title">{destination.title}</h1>
        <img className="destination-img" src={destination.img} alt={destination.title} />
        <h4 className="destination-semi-title">Categoria: {destination.category}</h4>
        <div className="single-wrapper">
        <p className="destination-p"><strong>Paese:</strong> <span className="destination-span">{destination.country}</span></p>
        <p className="destination-p"><strong>Lingua Parlata:</strong> <span className="destination-span">{destination.language}</span></p>
        <p className="destination-p"><strong>Attività consigliate:</strong> <span className="destination-span">{destination.activities.join(", ")}</span></p>
        <p className="destination-p"><strong>Stagione consigliata:</strong> <span className="destination-span">{destination.recommendedSeason}</span></p>
        <p className="destination-p"><strong>Clima :</strong> <span className="destination-span">{destination.climate}</span></p>
        <p className="destination-p"><strong>Prezzo Medio :</strong> <span className="destination-span">{`${destination.averageCost}€`}</span></p> 
        
        </div>
        <div className="btn-wrapper">
<button
  onClick={() => toggleSelect(destination.id)}
  className={selectedIds.includes(destination.id) ? "btn-click" : "btn-btn"}
>
  {selectedIds.includes(destination.id) ? "Rimuovi" : "Aggiungi al Comparatore"}
</button>

<Link to="/" className="btn">Torna alla Home</Link>

<button
  onClick={() => toggleFavorite(destination.id)}
  className={favoriteIds.includes(destination.id) ? "btn-click" : "btn-btn"}
>
  {favoriteIds.includes(destination.id) ? "Rimuovi dai Preferiti" : "Aggiungi ai Preferiti"}
</button>

        </div>
        </div>
    )
}